const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const http = require('http');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoints dos rescursos da API são criados em arquivos próprios
app.use('/', require('./route/animaisRoute'));
app.use('/', require('./route/pesagensRoute'));
app.use('/', require('./route/estoqueRoute'));
app.use('/', require('./route/vacinasRoute'));

module.exports = app;

if (require.main === module) {
  const port = 8080;
  app.listen(port, () => {
    console.log(`[SUCCESS] Server is running on http://127.0.0.1:${PORT}`);
  });
}

