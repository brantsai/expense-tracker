import './Modal.css';

const UserModal = ( { closeModal }) => {
  return (  
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => closeModal()}>x</button>
        <h3>Add/Edit User</h3>
        <form>
          <div>
            <label htmlFor="firstname">First Name: </label>
            <input name="firstname" required="required"></input>
          </div>
          <div>
            <label htmlFor="lastname">Last Name: </label>
            <input name="lastname" required="required"></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
 
export default UserModal;