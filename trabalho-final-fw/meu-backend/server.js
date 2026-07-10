const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'trabalho_fw'
});

db.connect((erro) => {
  if (erro) console.error('Erro no MySQL:', erro);
  else console.log('Conectado ao banco de dados MySQL!');
});

app.post('/users', (req, res) => {
  const { name, email, city } = req.body; 
  const comandoSQL = 'INSERT INTO usuarios (name, email, city) VALUES (?, ?, ?)';
  db.query(comandoSQL, [name, email, city], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao salvar' });
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM usuarios', (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao buscar' });
    const usuariosFormatados = resultados.map(u => ({
      id: u.id, name: u.name, email: u.email, address: { city: u.city }
    }));
    res.json(usuariosFormatados);
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id; // Pega o ID na URL
  const { name, email, city } = req.body; 
  const comandoSQL = 'UPDATE usuarios SET name = ?, email = ?, city = ? WHERE id = ?';
  db.query(comandoSQL, [name, email, city, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao editar' });
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id; // Pega o ID na URL
  const comandoSQL = 'DELETE FROM usuarios WHERE id = ?';
  db.query(comandoSQL, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao apagar' });
    res.json({ mensagem: 'Usuário apagado com sucesso!' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando com sucesso em http://localhost:${PORT}`);
});