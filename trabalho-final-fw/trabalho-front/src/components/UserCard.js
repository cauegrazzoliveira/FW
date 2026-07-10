import React from 'react';

function UserCard({ user, aoEditar, aoDeletar }) {
  const cardStyle = {
    border: '1px solid #ccc',
    margin: '10px',
    padding: '15px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'left',
    backgroundColor: '#fff'
  };

  const btnStyle = {
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    color: '#fff'
  };

  return (
    <div style={cardStyle}>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Cidade:</strong> {user.address.city}</p>
      
      <div style={{ marginTop: '15px' }}>
        <button style={{ ...btnStyle, backgroundColor: '#f0ad4e' }} onClick={() => aoEditar(user)}>
          Editar
        </button>
        <button style={{ ...btnStyle, backgroundColor: '#d9534f' }} onClick={() => aoDeletar(user.id)}>
          Apagar
        </button>
      </div>
    </div>
  );
}

export default UserCard;