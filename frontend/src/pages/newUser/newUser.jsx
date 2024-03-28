import { Link } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import userService from '../../services/userService';

const NewUser = () => {
  const [name, setName] = useState('');

  const handleSave = async () => {
    try {
      await userService.createUser(name);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="new-user-container">
      <h2 className="new-user-header">Create New User</h2>
      <form className="new-user-form">
        <label className="new-user-label" htmlFor="name">Name:</label>
        <input
          className="new-user-input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button className="new-user-button" onClick={handleSave}>
          <Link to="/" relative='path'>Save</Link>
        </button>
        <button className="new-user-button">
          <Link to="/" relative='path'>Cancel</Link>
        </button>
      </form>
    </div>
  );
};

export default NewUser;
