const UserTable = () => {
  const dummyData = [
    {
      firstName: 'Brandon',
      lastName: 'Tsai',
      totalExpenses: 0,
    }
  ]

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Total Expenses</th>
        </tr>
        {dummyData.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.firstName}</td>
              <td>{val.lastName}</td>
              <td>{val.totalExpenses}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}
 
export default UserTable;