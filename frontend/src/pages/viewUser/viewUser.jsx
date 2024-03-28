import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './index.css'; 
import userService from '../../services/userService';

const ViewUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [p5Balance, setP5Balance] = useState(0);
  const [rewardBalance, setRewardBalance] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await userService.getUserById(id);
        setName(userData.name);
        setP5Balance(userData.points);
        setRewardBalance(userData.rewards);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      await userService.updateUser(name, id)
    } catch (error) {
      console.error('Error saving user details:', error);
      // Handle error
    }
  };

  return (
    <div className="user-form-container">
      <h2 className="user-form-header">View User</h2>
      <div className="user-form">
        <label className="user-label" htmlFor="name">Name:</label>
        <input
          className="user-input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button className="user-button" onClick={handleSave}>Save</button>
      </div>
      <div>
        <button>
          <Link to={`/${id}/p5`}>P5 Balance: {p5Balance}</Link>
        </button>
        <button>
          <Link to={`/${id}/rewards`}>Reward Balance: {rewardBalance}</Link>
        </button>
      </div>
    </div>
  );
};

export default ViewUser;
