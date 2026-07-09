import React from 'react';

function UserCard({ user }) {
  const cardStyle = {
    border: '1px solid #ccc',
    margin: '10px auto',
    padding: '10px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'left'
  };

  return (
    <div style={cardStyle}>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Cidade:</strong> {user.address.city}</p>
    </div>
  );
}

export default UserCard;