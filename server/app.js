const express = require('express');
const app = express();

// Endpoints dos rescursos da API são criados em arquivos próprios

app.use(express.json());
app.use('/', require('./route/animaisRoute'));

app.listen(3000);
