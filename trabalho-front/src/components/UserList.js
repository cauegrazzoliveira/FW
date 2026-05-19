import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Usuários (Vindos da API)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Passando os dados dinâmicos para o componente filho */}
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;