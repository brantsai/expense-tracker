const CompanyExpenseTable = ( { expenseData }) => {
  const renderTotalCost = (category) => {
    let total = 0;
    Object.values(expenseData['categories'][category]).map((expense) => {
      total += Number(expense);
    })
    return total;
  }

  return (  
    <div>
      <h2>Company Expense Table</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Food</th>
            <th>{renderTotalCost('Food')}</th>
          </tr>
          <tr>
            <th>Travel</th>
            <th>{renderTotalCost('Travel')}</th>
          </tr>
          <tr>
            <th>Equipment</th>
            <th>{renderTotalCost('Equipment')}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
 
export default CompanyExpenseTable;