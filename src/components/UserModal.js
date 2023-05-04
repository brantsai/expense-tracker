import { useState } from 'react';
import './Modal.css';

const UserModal = ( { closeModal, handleAddEditUser, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
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
    handleAddEditUser(formState);
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
              type="text"
              value={formState.firstName} 
              required="required"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Last Name: </label>
            <input 
              name="lastName"
              type="text"
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