const database = require('../infra/database');

exports.getAnimais = function () {
  return database.query("SELECT * FROM fazenda.animais;");
};

exports.getAnimal = function (id) {
  return database.oneOrNone(`SELECT * FROM fazenda.animais WHERE id = ${id}`);
};

exports.saveAnimal = function (animal) {
  return database.one("INSERT INTO fazenda.animais (codigo, peso) VALUES ($1, $2) returning *", [animal.codigo, animal.peso]);
};

exports.updateAnimal = function (id, animal) {
  return database.none("UPDATE fazenda.animais SET codigo = $1, peso = $2 WHERE id = $3", [animal.codigo, animal.peso, id]);
};

exports.deleteAnimal = function (id) {
  return database.none(`DELETE FROM fazenda.animais WHERE id = ${id}`);
};
