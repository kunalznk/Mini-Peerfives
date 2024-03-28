import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [counter , setCounter ] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setCounter(prev => prev+1)
    };

    if(users.length == 0 && counter === 0) {
        fetchUsers();
    }

  }, [users, counter]);

  return (
    <div className="user-list-container">
    <h2 className="user-list-header">User List</h2>
    <button className="create-user-button">
      <Link to="/new">Create New User</Link>
    </button>
    <table className="user-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>P5 Balance</th>
          <th>Reward Balance</th>
          <th>Login</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.points}</td>
            <td>{user.rewards}</td>
            <td>
              <Link to={`/${user._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UsersList;
