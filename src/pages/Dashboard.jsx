import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import boardContext from '../context/boardContext';
import authContext from '../context/authContext';

const Dashboard = () => {
  const { boards, getBoards, addBoard } = useContext(boardContext);
  const { user } = useContext(authContext);

  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    getBoards();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setBoardName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (boardName.trim() !== '') {
      addBoard({ name: boardName });
      setBoardName('');
    }
  };

  return (
    <div>
      <h1>Welcome, {user && user.name}</h1>
      <h2 style={{ marginTop: '2rem' }}>Your Boards</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="boardName"
          value={boardName}
          onChange={onChange}
          placeholder="New Board Name"
          required
        />
        <input type="submit" value="Create Board" />
      </form>

      <hr style={{ margin: '1rem 0' }}/>

      <div className="boards-container">
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0', cursor: 'pointer' }}>
                <h3>{board.name}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>You have no boards yet. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;