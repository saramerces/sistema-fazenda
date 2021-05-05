const express = require('express');
const app = express();

const PORT = 8080;

// Endpoints dos rescursos da API são criados em arquivos próprios
app.use(express.json());
app.use('/', require('./route/animaisRoute'));

console.log("Roteadores de Endpoints carregados")
console.log(`Iniciando servidor ouvindo em http://localhost:${PORT}`);

app.listen(PORT);
