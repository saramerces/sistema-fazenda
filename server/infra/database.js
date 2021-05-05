const pgp = require('pg-promise')();

// Quando usando o docker-compose, o nome do host é 'db_fazenda' que é nome do
// contêiner que roda o banco de dados postgres, então deve-se usar esse nome
// para o deploy.
// Para rodar os testes localmente deve-se alterar o host para 'localhost'.

const db = pgp({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'fazenda_db'
});

module.exports = db;
