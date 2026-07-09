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

app.get('/users', (req, res) => {
  db.query('SELECT * FROM usuarios', (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao buscar' });
    
    const usuariosFormatados = resultados.map(u => ({
      id: u.id, name: u.name, email: u.email, address: { city: u.city }
    }));
    res.json(usuariosFormatados);
  });
});

app.post('/users', (req, res) => {
  const { name, email, city } = req.body; 

  const comandoSQL = 'INSERT INTO usuarios (name, email, city) VALUES (?, ?, ?)';
  
  db.query(comandoSQL, [name, email, city], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: 'Erro ao salvar' });
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando com sucesso em http://localhost:${PORT}`);
});