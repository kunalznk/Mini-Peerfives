import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'; 
import userService from '../../services/userService';
import rewardHistoryService from '../../services/rewardHistoryService';

const NewReward = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [p5Balance, setP5Balance] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getUsers();
        setUsers(userData.filter(user => user._id !== id)); 
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
      }
    };

    const fetchP5Balance = async () => {
      try {
        const userData = await userService.getUserById(id);
        setP5Balance(userData.points);
      } catch (error) {
        console.error('Error fetching P5 balance:', error);
        // Handle error
      }
    };

    fetchUsers();
    fetchP5Balance();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rewardHistoryService.createReward(id, rewardAmount, selectedUser);
      navigate(`/${id}/rewards`);
    } catch (error) {
      console.error('Error creating reward:', error);
      // Handle error
    }
  };

  const handleCancel = () => {
    navigate({
     to: -1   
    })
  };

  const handleRewardAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    setRewardAmount(amount);
  };

  return (
    <div className="new-reward-container">
      <h2>New Reward</h2>
      <form onSubmit={handleSubmit} className="new-reward-form">
        <label htmlFor="recipient">Recipient:</label>
        <select
          id="recipient"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <br />
        <label htmlFor="amount">Amount (max 100):</label>
        <input
          type="number"
          id="amount"
          value={rewardAmount}
          onChange={handleRewardAmountChange}
          max={100}
          required
        />
    <span>P5 Balance: {p5Balance}</span>
        <br />
        <button type="submit" disabled={rewardAmount > 100 || rewardAmount > p5Balance}>
          Submit
        </button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default NewReward;
