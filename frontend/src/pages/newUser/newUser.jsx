import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import userService from '../../services/userService';

const NewUser = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate()

  const handleSave = async () => {
    try {
      await userService.createUser(name);
      navigate(-1)
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="new-user-container">
      <h2 className="new-user-header">Create New User</h2>
      <div className="new-user-form">
        <label className="new-user-label" htmlFor="name">Name:</label>
        <input
          className="new-user-input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button className="new-user-button" onClick={async () => await handleSave()}>
          Save
        </button>
        <button className="new-user-button">
          <Link to="/" relative='path'>Cancel</Link>
        </button>
      </div>
    </div>
  );
};

export default NewUser;
