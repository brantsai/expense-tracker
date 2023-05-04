import { useState } from "react";

const ExpenseModal = ({ expenseData, closeModal, setSelectedUser, handleAddEditExpense }) => {
  const [formState, setFormState] = useState({
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
        [e.target.name]: expenseData['users'][userID]
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
          setSelectedUser(null);
          closeModal();
        }}>x</button>
        <h3>Add/Edit Expense</h3>
        <form>
          <div>
            <label>Full Name: </label>
            <select name="fullName" onChange={handleChange}>
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
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Equipment">Equipment</option>
            </select><br></br>
            <label>Description: </label>
            <input
              type="text"
              name="description" 
              required="required"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Cost: </label>
            <input 
              type="number"
              name="cost"
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