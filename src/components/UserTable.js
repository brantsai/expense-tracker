const UserTable = ({ expenseData, openModal, handleDeleteRow, handleEditUser }) => {

  const editUser = () => {

  }

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Expenses ($)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(expenseData.users).map(([key, val]) => {
            // map through all users in dataset and list data
            return (
              <tr key={key}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.totalExpenses}</td>
                <td><button onClick={() => {
                  handleEditUser(key);
                }}>Edit User</button></td>
                <td><button onClick={() => {
                  handleDeleteRow(key, 'users');
                }}>Delete User</button></td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td><button onClick={() => {
              openModal();
            }}>Add User</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
 
export default UserTable;