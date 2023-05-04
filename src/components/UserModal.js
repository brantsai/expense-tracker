import { useState } from 'react';
import './Modal.css';

const UserModal = ( { closeModal, handleAddUser }) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState, 
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(formState);
    closeModal();
  }

  return (  
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => closeModal()}>x</button>
        <h3>Add/Edit User</h3>
        <form>
          <div>
            <label>First Name: </label>
            <input
              name="firstName" 
              value={formState.firstName} 
              required="required"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Last Name: </label>
            <input 
              name="lastName"
              value={formState.lastName}
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
 
export default UserModal;