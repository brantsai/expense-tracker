import './App.css';
import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

function App() {
  const [userModalToggle, setUserModalToggle]  = useState(false);
  const [latestUserID, setLatestUserID] = useState(3);
  const [expenseData, setExpenseData] = useState({
    // we are creating our data as a nested object with user, category, and expenses as properties
    users: { 
      // users are organized by their userID for O(1) lookup
      1: {
        firstName: 'Brandon',
        lastName: 'Tsai',
        totalExpenses: 0,
        userID: 1,
      },
      2: {
        firstName: 'Linda',
        lastName: 'Goh',
        totalExpenses: 0,
        userID: 2,
      }
    },
    categories: [],
    expenses: { // expenses are also organized by expenseID
      1: 
      { 1:
          {
            userID: 1,
            category: 'Food',
            description: 'Pizza',
            cost: '8',
            expenseID: 1,
          }
      }
    },
  });

  const handleDeleteRow = (id, type) => {
    // delete the corresponding user or expense from the table based on its id
    setExpenseData((prevData) => {
      let newData = {...prevData};
      delete newData[type][id];
      return newData;
    });
  };

  const handleAddUser = (newRow) => {
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

    setLatestUserID(latestUserID + 1);
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
        handleDeleteRow={handleDeleteRow}
      />
      {userModalToggle ? 
        <UserModal 
          closeModal={() => {
            setUserModalToggle(false);
          }}
          handleAddUser={handleAddUser}
        /> 
        : null}
    </div>
  );
}

export default App;
