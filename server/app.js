const express = require('express');
const app = express();

const PORT = 8080;

// Endpoints dos rescursos da API são criados em arquivos próprios
app.use(express.json());
app.use('/', require('./route/animaisRoute'));
app.use('/', require('./route/pesagensRoute'));
app.use('/', require('./route/estoqueRoute'));

console.log("Endpoints routers loaded")
console.log("Server listen on", `http://localhost:${PORT}`);

app.listen(PORT);
