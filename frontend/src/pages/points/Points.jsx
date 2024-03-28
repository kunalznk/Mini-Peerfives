import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css'; 
import rewardHistoryService from '../../services/rewardHistoryService';
import userService from '../../services/userService';

const Points = () => {
  const { id } = useParams();
  const [p5Balance, setP5Balance] = useState(0);
  const [p5History, setP5History] = useState([]);

  useEffect(() => {
    const fetchP5History = async () => {
      try {
        const p5HistoryData = await rewardHistoryService.getPointsHistoryByUserId(id);
        setP5History(p5HistoryData);
      } catch (error) {
        console.error('Error fetching P5 history:', error);
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

    fetchP5History();
    fetchP5Balance();
  }, [id]);

  const handleDeleteP5 = async (p5Id) => {
    try {
      const rewards = await rewardHistoryService.deleteRewardById(p5Id)
      console.log(rewards);
    } catch (error) {
      console.error('Error deleting P5:', error);
      // Handle error
    }
  };

  return (
    <div className="p5-history-container">
      <h2>P5 History</h2>
      <div>
        <Link to={`/${id}/rewards/new`}>Create New Reward</Link>
      </div>
      <div>P5 Balance: {p5Balance}</div>
      <table className="p5-history-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 given</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {p5History.map((p5, index) => (
            <tr key={p5._id}>
              <td>{index + 1}</td>
              <td>{new Date(p5.timestamp).toLocaleString()}</td>
              <td>{p5.points}</td>
              <td>{p5.givenToUser[0].name}</td>
              <td>
                <button onClick={() => handleDeleteP5(p5._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Points;
