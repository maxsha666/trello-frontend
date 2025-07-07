import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BoardContext from '../context/board/boardContext';
import AuthContext from '../context/auth/authContext';

const Dashboard = () => {
  const { boards, getBoards, addBoard, error } = useContext(BoardContext);
  const { user } = useContext(AuthContext);

  const [newBoard, setNewBoard] = useState({ title: '' });
  const { title } = newBoard;

  useEffect(() => {
    getBoards();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setNewBoard({ ...newBoard, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      // Opcional: Mostrar alerta de campo vacío
      return;
    }
    // CORRECCIÓN: Enviamos un objeto con la clave 'title', que es lo que el backend espera.
    addBoard({ title });
    setNewBoard({ title: '' }); // Limpiamos el formulario después de enviar
  };

  return (
    <div>
      <h1>Welcome, {user && user.name}</h1>
      <h2 style={{ marginTop: '2rem' }}>Your Boards</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title" // Es buena práctica que el 'name' coincida con la clave del estado
          value={title}
          onChange={onChange}
          placeholder="New Board Name"
          required
        />
        <input type="submit" value="Create Board" />
      </form>
      
      {error && <p style={{color: 'red'}}>{error}</p>}

      <hr style={{ margin: '1rem 0' }}/>

      <div className="boards-container">
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <Link key={board._id} to={`/board/${board._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0', cursor: 'pointer' }}>
                {/* El modelo de Board usa 'title', no 'name' */}
                <h3>{board.title}</h3>
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