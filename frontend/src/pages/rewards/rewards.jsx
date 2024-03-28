import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import rewardHistoryService from '../../services/rewardHistoryService';
import userService from '../../services/userService';

const Rewards = () => {
  const { id } = useParams();
  const [rewardBalance, setRewardBalance] = useState(0);
  const [rewardHistory, setRewardHistory] = useState([]);

  useEffect(() => {
    const fetchRewardHistory = async () => {
      try {
        const rewardHistoryData = await rewardHistoryService.getRewardHistoryByUserId(id);
        setRewardHistory(rewardHistoryData);
      } catch (error) {
        console.error('Error fetching reward history:', error);
        // Handle error
      }
    };

    const fetchRewardBalance = async () => {
      try {
        const userData = await userService.getUserById(id);
        setRewardBalance(userData.rewards);
      } catch (error) {
        console.error('Error fetching reward balance:', error);
        // Handle error
      }
    };

    fetchRewardHistory();
    fetchRewardBalance();
  }, [id]);

  return (
    <div className="reward-history-container">
      <h2>Reward History</h2>
      <div>Rewards Balance: {rewardBalance}</div>
      <table className="reward-history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {rewardHistory.map((reward, index) => (
            <tr key={reward._id}>
              <td>{index + 1}</td>
              <td>{new Date(reward.timestamp).toLocaleString()}</td>
              <td>{reward.points}</td>
              <td>{reward.givenByUser[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rewards;
