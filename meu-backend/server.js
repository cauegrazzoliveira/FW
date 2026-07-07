const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json());

const usuarios = [
  { id: 1, name: "Cauê Grazziotin Oliveira", email: "caue@exemplo.com", address: { city: "Porto Alegre" } },
  { id: 2, name: "Ana Silva", email: "ana@exemplo.com", address: { city: "Rio de Janeiro" } },
  { id: 3, name: "Carlos Eduardo", email: "carlos@exemplo.com", address: { city: "Belo Horizonte" } }
];

app.get('/users', (req, res) => {
  res.json(usuarios);
});

app.listen(PORT, () => {
  console.log(`Backend rodando com sucesso em http://localhost:${PORT}`);
});