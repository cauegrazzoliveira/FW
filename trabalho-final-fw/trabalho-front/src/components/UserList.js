import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');

  const [editandoId, setEditandoId] = useState(null); 

  const carregarUsuarios = () => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const salvarUsuario = (evento) => {
    evento.preventDefault(); 
    const dadosUsuario = { name: nome, email: email, city: cidade };

    if (editandoId) {
      fetch(`http://localhost:3001/users/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
      }).then(() => {
        alert("Usuário editado com sucesso!");
        limparFormulario();
        carregarUsuarios();
      });
    } else {
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
      }).then(() => {
        alert("Usuário salvo com sucesso!");
        limparFormulario();
        carregarUsuarios();
      });
    }
  };

  const deletarUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja apagar este usuário?")) {
      fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert("Usuário apagado!");
        carregarUsuarios();
      });
    }
  };

  const prepararEdicao = (user) => {
    setNome(user.name);
    setEmail(user.email);
    setCidade(user.address.city);
    setEditandoId(user.id);
    window.scrollTo(0, 0); 
  };

  const limparFormulario = () => {
    setNome(''); setEmail(''); setCidade(''); setEditandoId(null);
  };

  return (
    <div>
      <h2>{editandoId ? "Editar Usuário" : "Cadastrar Novo Usuário"}</h2>
      
      <form onSubmit={salvarUsuario} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', display: 'inline-block', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required style={{ margin: '5px', padding: '5px' }} />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={{ margin: '5px', padding: '5px' }} />
        <input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} required style={{ margin: '5px', padding: '5px' }} />
        
        <button type="submit" style={{ padding: '6px 15px', cursor: 'pointer', backgroundColor: editandoId ? '#f0ad4e' : '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', marginLeft: '5px' }}>
          {editandoId ? "Atualizar" : "Salvar"}
        </button>

        {/* Botão para cancelar a edição se o usuário mudar de ideia */}
        {editandoId && (
          <button type="button" onClick={limparFormulario} style={{ padding: '6px 15px', cursor: 'pointer', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', marginLeft: '5px' }}>
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h2>Lista de Usuários (CRUD Completo)</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            aoEditar={prepararEdicao} 
            aoDeletar={deletarUsuario} 
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;