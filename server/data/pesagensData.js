const database = require('../infra/database');

exports.getPesagens = function () {
  return database.query("SELECT * FROM pesagens;")
};

exports.getPesagem = function (id) {
  return database.oneOrNone("SELECT * FROM pesagens WHERE id = $1", [id]);
};

exports.savePesagem = function (pesagem) {
  return database.one(
    "INSERT INTO pesagens (id_animal, peso) VALUES ($1, $2) RETURNING *",
    [pesagem.animalId, pesagem.peso]
  );
};

exports.updatePesagem = function (id, pesagem) {
  return database.none(
    "UPDATE pesagens SET peso = $1, data = $2 WHERE id = $3",
    [pesagem.peso, pesagem.data, id]
  );
};

exports.deletePesagem = function (id) {
  return database.none("DELETE FROM pesagens WHERE id = $1", [id]);
};
