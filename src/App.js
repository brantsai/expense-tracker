import './App.css';
import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

function App() {
  const [userModalToggle, setUserModalToggle]  = useState(false);

  const [expenseData, setExpenseData] = useState({
    // we are creating our data as a nested object with user, category, and expenses as properties
    users: { // users are organized by their userID for O(1) lookup
      1: {
        firstName: 'Brandon',
        lastName: 'Tsai',
        totalExpenses: 0,
      },
      2: {
        firstName: 'Linda',
        lastName: 'Goh',
        totalExpenses: 0,
      }
    },
    categories: [],
    expenses: { // expenses are also organized by expenseID
      
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
        /> 
        : null}
    </div>
  );
}

export default App;
