import { useState } from 'react';
import './Modal.css';

const UserModal = ( { closeModal, setSelectedUser, handleAddEditUser, defaultValue }) => {
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
        <button onClick={() => {
          closeModal();
          setSelectedUser(null);
        }}>x</button>
        <h3>Add/Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name: </label>
            <input
              name="firstName" 
              type="text"
              value={formState.firstName} 
              onChange={handleChange}
              required
            ></input>
          </div>
          <div>
            <label>Last Name: </label>
            <input 
              name="lastName"
              type="text"
              value={formState.lastName}
              onChange={handleChange}
              required
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
 
export default UserModal;