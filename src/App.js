import './App.css';
import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

function App() {
  const [userModalToggle, setUserModalToggle]  = useState(false);

  const [expenseData, setExpenseData] = useState({
    users: {
      1: {
        firstName: 'Brandon',
        lastName: 'Tsai',
        totalExpenses: 0,
      }
    },
    categories: [],
    expenses: [],
  });

  return (
    <div>
      <h1>Expense Tracker</h1>
      <UserTable 
        expenseData={expenseData} 
        setExpenseData={setExpenseData} 
        setUserModalToggle={setUserModalToggle}
      />
      {userModalToggle ? 
        <UserModal 
          setUserModalToggle={setUserModalToggle}
        /> 
        : null}
    </div>
  );
}

export default App;
