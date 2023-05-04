import { useState } from "react";

const ExpenseModal = ({ defaultValue, selectedUser, expenseData, setSelectedExpense, closeModal, setSelectedUser, handleAddEditExpense }) => {
  const [formState, setFormState] = useState(defaultValue || {
    fullName: 'Brandon Tsai',
    category: 'Food',
    description: '',
    cost: 0,
  })

  const handleChange = (e) => {
    // when selecting full name from dropdown, use setSelectedUser to grab selected userID
    if (e.target.name === 'fullName') {
      const userID = e.target.value;
      setSelectedUser(userID);
      setFormState({
        ...formState,
        [e.target.name]: expenseData['users'][userID]['firstName'] + ' ' + expenseData['users'][userID]['lastName']
      })
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddEditExpense(formState);
    closeModal();
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => {
          setSelectedExpense(null);
          setSelectedUser(null);
          closeModal();
        }}>x</button>
        <h3>Add/Edit Expense</h3>
        <form>
          <div>
            <label>Full Name: </label>
            <select name="fullName" onChange={handleChange}>
              <option value="Select">Select User</option>
              {Object.entries(expenseData.users).map(([key, val]) => {
                return (
                  <option 
                    key={key} 
                    value={key}
                  >{val.firstName} {val.lastName}</option>
                )
              })}
            </select><br></br>
            <label>Category: </label>
            <select name="category" onChange={handleChange}>
              <option value="Select">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Equipment">Equipment</option>
            </select><br></br>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={formState.description}
              required="required"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Cost: </label>
            <input 
              type="number"
              name="cost"
              value={formState.cost}
              required="required"
              onChange={handleChange}
            ></input>
          </div>
          <button 
            type="submit"
            onClick={handleSubmit}
          >Submit</button>
        </form>
      </div>
    </div>
  );
}
 
export default ExpenseModal;