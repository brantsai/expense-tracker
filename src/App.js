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
  const [latestExpenseID, setLatestExpenseID] = useState(2);
  const [selectedUser, setSelectedUser] = useState(null);
  const [oldUser, setOldUser] = useState(null);
  const [oldCategory, setOldCategory] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

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
        expenses: {
          1: 8,
        }, // user expenses are referenced in an object by expenseID with its cost value
      },
      2: {
        firstName: 'Linda',
        lastName: 'Goh',
        totalExpenses: 0,
        userID: 2,
        expenses: {},
      }
    },
    categories: { 
      'Food': {
        1: 8,
      },
      'Travel': {},
      'Equipment': {} // expenses per category are referenced in an object by expenseID
    },
    expenses: { //expenses are organized by expenseID for O(1) lookup
      1: {
        fullName: 'Brandon Tsai',
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
      
      // iterate through all user's expenses and delete expenses
      for (let expenseID in newData['users'][id]['expenses']) {
        delete newData['categories'][newData['expenses'][expenseID]['category']][expenseID];
        delete newData['expenses'][expenseID];
      }

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
        ['userID']: latestUserID,
        ['expenses']: {},
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

    // delete expenses from user and category data as well
    setExpenseData((prevData) => {
      let newData = {...prevData};
      newData['users'][userID]['totalExpenses'] -= expenseCost;
      delete newData['users'][userID]['expenses'][id];
      delete newData['categories'][newData['expenses'][id]['category']][id];
      delete newData['expenses'][id];
      return newData;
    });
  };

  // this function sets the selected expense id and stores it in state for further use
  const handleSelectExpense = (expenseID, userID, category) => {
    setSelectedExpense(expenseID);
    setOldUser(userID);
    setOldCategory(category);
    setExpenseModalToggle(true);
  }

  // this function adds or edits an expense in the expense table
  const handleAddEditExpense = (newRow) => {
    if (selectedExpense === null) {
      // add new expense
      newRow = {
        ...newRow,
        ['userID']: selectedUser,
        ['expenseID']: latestExpenseID,
      };
  
      setExpenseData((prevData) => {
        let newData = {...prevData};
        newData['expenses'][latestExpenseID] = newRow;
        newData['users'][selectedUser]['totalExpenses'] += Number(newRow['cost']); // add expense cost to user's total expenses
        
        newData['users'][selectedUser]['expenses'][latestExpenseID] = newRow['cost']; // add selected expense to user's expenses

        // add selected expense to category expenses
        newData['categories'][newRow['category']][latestExpenseID] = newRow['cost'];

        setLatestExpenseID(latestExpenseID + 1); // increment latest expense id to remove duplicate id's
        setSelectedUser(null); // reset selected user state since we don't need the user id anymore
        return newData;
      })
    } else { // edit selected expense
      newRow = {
        ...newRow,
        ['userID']: selectedUser || oldUser,
        ['expenseID']: selectedExpense,
      };

      setExpenseData((prevData) => {
        let newData = {...prevData};
        newData['expenses'][selectedExpense] = newRow;

        // subtract old amount from old user, add new amount to new user
        newData['users'][oldUser]['totalExpenses'] -= Number(expenseData['expenses'][selectedExpense]['cost']);
        newData['users'][selectedUser || oldUser]['totalExpenses'] += Number(newRow['cost']);

        // remove selected expense from old user, add to new user
        delete newData['users'][oldUser]['expenses'][selectedExpense];
        newData['users'][selectedUser]['expenses'][selectedExpense] = newRow['cost'];

        // remove selected expense from old category, add to new category
        delete newData['categories'][oldCategory][selectedExpense];
        newData['categories'][newRow['category']][selectedExpense] = newRow['cost'];

        setSelectedExpense(null);
        setSelectedUser(null);
        return newData;
      })
    }

  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <UserTable 
        expenseData={expenseData} 
        setExpenseData={setExpenseData} 
        handleSelectUser={handleSelectUser}
        handleDeleteUser={handleDeleteUser}
        openModal={() => {
          setUserModalToggle(true);
        }}
      />
      {userModalToggle ? 
        <UserModal 
          closeModal={() => {
            setUserModalToggle(false);
          }}
          handleAddEditUser={handleAddEditUser}
          defaultValue={selectedUser != null && expenseData['users'][selectedUser]}
          setSelectedUser={setSelectedUser}
        /> 
        : null}
      <ExpenseTable 
        expenseData={expenseData}
        handleDeleteExpense={handleDeleteExpense}
        handleSelectExpense={handleSelectExpense}
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
          setSelectedUser={setSelectedUser}
          setSelectedExpense={setSelectedExpense}
          selectedUser={selectedUser}
          handleAddEditExpense={handleAddEditExpense}
          defaultValue={selectedExpense != null && expenseData['expenses'][selectedExpense]}
        />
        : null}
      <CompanyExpenseTable expenseData={expenseData}/>
    </div>
  );
}

export default App;
