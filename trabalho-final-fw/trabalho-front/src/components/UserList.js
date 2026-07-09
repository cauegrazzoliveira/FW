import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');

  const carregarUsuarios = () => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const salvarNovoUsuario = (evento) => {
    evento.preventDefault(); 

    const dadosNovoUsuario = {
      name: nome,
      email: email,
      city: cidade
    };

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosNovoUsuario)
    })
    .then(() => {
      alert("Usuário salvo com sucesso!");
      carregarUsuarios(); 
      setNome(''); setEmail(''); setCidade(''); 
    });
  };

  return (
    <div>
      <h2>Cadastrar Novo Usuário</h2>
      
      {/* Formulário super simples */}
      <form onSubmit={salvarNovoUsuario} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', display: 'inline-block' }}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required style={{ margin: '5px' }} />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={{ margin: '5px' }} />
        <input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} required style={{ margin: '5px' }} />
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>Salvar</button>
      </form>

      <hr />

      <h2>Lista de Usuários (Vindos do Banco de Dados)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UserList;