import './App.css';
import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import CompanyExpenseTable from './components/CompanyExpenseTable';
import ExpenseTable from './components/ExpenseTable';
import ExpenseModal from './components/ExpenseModal';

function App() {
  const [userModalToggle, setUserModalToggle]  = useState(false);
  const [expenseModalToggle, setExpenseModalToggle] = useState(false);
  const [latestUserID, setLatestUserID] = useState(3);
  const [selectedUser, setSelectedUser] = useState(null);

  // ** DATA MODEL ** /

  const [expenseData, setExpenseData] = useState({
    // we are creating our data as a nested object with user, category, and expenses as properties
    users: { 
      // users are organized by their userID for O(1) lookup
      1: {
        firstName: 'Brandon',
        lastName: 'Tsai',
        totalExpenses: 8,
        userID: 1,
        expenses: [1], // user expenses are referenced in a list by expenseID
      },
      2: {
        firstName: 'Linda',
        lastName: 'Goh',
        totalExpenses: 0,
        userID: 2,
      }
    },
    categories: { 
      'Food': [1] // expenses per category are referenced in a list by expenseID
    },
    expenses: { //expenses are organized by expenseID for O(1) lookup
      1: {
        category: 'Food',
        description: 'Pizza',
        cost: 8,
        userID: 1,
        expenseID: 1,
      }
    }
  });

  // ** USER TABLE FUNCTIONS ** //

  // this function deletes an entry from the users table
  const handleDeleteUser = (id) => {
    // delete the selected user from the table based on its id
    setExpenseData((prevData) => {
      let newData = {...prevData};
      delete newData['users'][id];
      return newData;
    });
  };
  
  // this function sets the selected user id and stores it in state for further use
  const handleSelectUser = (id) => {
    setSelectedUser(id);
    setUserModalToggle(true);
  }

  // this function edits a user or adds a new user to the user table
  const handleAddEditUser = (newRow) => {
    
    // check conditions to edit or add
    if (selectedUser === null) {
      // default totalExpenses for new user to 0, set ID to current latest ID and add row to existing data
      newRow = {
        ...newRow, 
        ['totalExpenses']: 0,
        ['userID']: latestUserID
      }
      
      setExpenseData((prevData) => {
        let newData = {...prevData};
        newData['users'][latestUserID] = newRow;
        return newData;
      });
  
      // increment latest user id to prevent duplicate ids
      setLatestUserID(latestUserID + 1);

    } else { // edit selected user
      newRow = {
        ...newRow, 
        ['totalExpenses']: expenseData['users'][selectedUser]['totalExpenses'],
        ['userID']: selectedUser,
      }

      setExpenseData((prevData) => {
        let newData = {...prevData};
        newData['users'][selectedUser] = newRow;
        setSelectedUser(null); // return user id state to null
        return newData;
      });
    }
  }

  // ** EXPENSE TABLE FUNCTIONS ** //

  // this function deletes an expense from the table based on selected id
  const handleDeleteExpense = (id) => {
    // when deleting an expense, the expense cost is subtracted from the user's total expenses
    const userID = expenseData['expenses'][id]['userID'];
    const expenseCost = expenseData['expenses'][id]['cost'];

    setExpenseData((prevData) => {
      let newData = {...prevData};
      newData['users'][userID]['totalExpenses'] -= expenseCost;
      delete newData['expenses'][id];
      return newData;
    });
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <UserTable 
        expenseData={expenseData} 
        setExpenseData={setExpenseData} 
        openModal={() => {
          setUserModalToggle(true);
        }}
        handleSelectUser={handleSelectUser}
        handleDeleteUser={handleDeleteUser}
      />
      {userModalToggle ? 
        <UserModal 
          closeModal={() => {
            setUserModalToggle(false);
          }}
          handleAddEditUser={handleAddEditUser}
          defaultValue={selectedUser != null && expenseData['users'][selectedUser]}
        /> 
        : null}
      <ExpenseTable 
        expenseData={expenseData}
        handleDeleteExpense={handleDeleteExpense}
        openModal={() => {
          setExpenseModalToggle(true);
        }}
      />
      {expenseModalToggle ? 
        <ExpenseModal 
          expenseData={expenseData}
          closeModal={() => {
            setExpenseModalToggle(false);
          }}
        />
        : null}
      <CompanyExpenseTable expenseData={expenseData}/>
    </div>
  );
}

export default App;
