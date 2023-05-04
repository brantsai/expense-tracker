const ExpenseModal = ({ expenseData, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => {
          closeModal();
        }}>x</button>
        <h3>Add/Edit Expense</h3>
        <form>
          <div>
            <label>Full Name: </label>
            <select name="fullName">
              {Object.entries(expenseData.users).map(([key, val]) => {
                return (
                  <option 
                    key={key} 
                    value={val.firstName + ' ' + val.lastName}>{val.firstName} {val.lastName}
                  </option>
                )
              })}
            </select><br></br>
            <label>Category: </label>
            <select name="category">
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="equipment">Equipment</option>
            </select><br></br>
            <label>Description: </label>
            <input
              name="description" 
              required="required"
            ></input>
          </div>
          <div>
            <label>Cost: </label>
            <input 
              type="number"
              name="cost"
              required="required"
            ></input>
          </div>
          <button 
            type="submit" 
          >Submit</button>
        </form>
      </div>
    </div>
  );
}
 
export default ExpenseModal;