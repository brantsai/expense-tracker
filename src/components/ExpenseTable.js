const ExpenseTable = ({ expenseData, handleDeleteExpense, openModal }) => {
  return (
    <div>
      <h2>Expense Table</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(expenseData.expenses).map(([key, val]) => {
            return (
              <tr key={key}>
                <td>{expenseData['users'][val.userID]['firstName'] + ' ' + expenseData['users'][val.userID]['lastName']}</td>
                <td>{val.category}</td>
                <td>{val.description}</td>
                <td>{val.cost}</td>
                <td><button onClick={() => {
                  // openModal(); SHOULD BE SELECT EXPENSE
                }}>Edit Expense</button></td>
                <td><button onClick={() => {
                  handleDeleteExpense(key);
                }}>Delete Expense</button></td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td><button onClick={() => {
              openModal();
            }}>Add Expense</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
 
export default ExpenseTable;