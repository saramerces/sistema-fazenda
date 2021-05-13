const database = require('../infra/database');

exports.getVacinas = function () {
  return database.query(`SELECT * FROM vacinas`);
};

exports.getVacina = function (vacinaId) {
  return database.one(`SELECT * FROM vacinas WHERE id = ${vacinaId}`);
};

exports.saveVacina = function (vacina) {
  return database.oneOrNone(
    "INSERT INTO vacinas (id_produto, tipo_vacina) VALUES ($1, $2) returning *",
    [vacina.produtoId, vacina.tipoVacina]
  );
};

exports.updateVacina = function (id, vacina) {
  return database.none(
    "UPDATE vacinas SET tipo_vacina = $1, id_produto = $2 WHERE id = $3",
    [vacina.tipoVacina, vacina.produtoId, id]
  );
};

exports.deleteVacina = function (id) {
  return database.none(`DELETE FROM vacinas WHERE id = ${id}`);
};