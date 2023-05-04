const ExpenseTable = ({ expenseData }) => {
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
          {}
        </tbody>
      </table>
    </div>
  );
}
 
export default ExpenseTable;