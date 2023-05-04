import './App.css';
import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import CompanyExpenseTable from './components/CompanyExpenseTable';
import ExpenseTable from './components/ExpenseTable';

function App() {
  const [userModalToggle, setUserModalToggle]  = useState(false);
  const [latestUserID, setLatestUserID] = useState(3);
  const [userToEdit, setUserToEdit] = useState(null);
  const [expenseData, setExpenseData] = useState({
    // we are creating our data as a nested object with user, category, and expenses as properties
    users: { 
      // users are organized by their userID for O(1) lookup
      1: {
        firstName: 'Brandon',
        lastName: 'Tsai',
        totalExpenses: 0,
        userID: 1,
        expenses: { // user expenses are organized by expenseID
          1: { 
            category: 'Food',
            description: 'Pizza',
            cost: '8',
            userID: 1,
            expenseID: 1,
          }
        },
      },
      2: {
        firstName: 'Linda',
        lastName: 'Goh',
        totalExpenses: 100000,
        userID: 2,
      }
    },
    categories: { 
      'Food': { // expenses per category are stored according to expenseID
        1: 
          {
            category: 'Food',
            description: 'Pizza',
            cost: 8,
            userID: 1,
            expenseID: 1,
          }
        }
      },
  });

  // this function deletes an entry from the users/expenses table
  const handleDeleteRow = (id, type) => {
    // delete the corresponding user or expense from the table based on its id
    setExpenseData((prevData) => {
      let newData = {...prevData};
      delete newData[type][id];
      return newData;
    });
  };
  
  // this function sets the selected user id to edit and stores it in state for further use
  const handleEditUser = (id) => {
    setUserToEdit(id);
    setUserModalToggle(true);
  }

  // this function adds a new user to the user table
  const handleAddEditUser = (newRow) => {
    
    // check conditions to edit or add
    if (userToEdit === null) {
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
        ['totalExpenses']: expenseData['users'][userToEdit]['totalExpenses'],
        ['userID']: userToEdit,
      }

      setExpenseData((prevData) => {
        let newData = {...prevData};
        newData['users'][userToEdit] = newRow;
        setUserToEdit(null); // return user id state to null
        return newData;
      });
    }
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
        handleEditUser={handleEditUser}
        handleDeleteRow={handleDeleteRow}
      />
      {userModalToggle ? 
        <UserModal 
          closeModal={() => {
            setUserModalToggle(false);
          }}
          handleAddEditUser={handleAddEditUser}
          defaultValue={userToEdit != null && expenseData['users'][userToEdit]}
        /> 
        : null}
      <ExpenseTable expenseData={expenseData}/>
      <CompanyExpenseTable expenseData={expenseData}/>
    </div>
  );
}

export default App;
