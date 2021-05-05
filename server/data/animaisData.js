const database = require('../infra/database');

exports.getAnimais = function () {
  return database.query("SELECT * FROM animais;");
};

exports.getAnimal = function (id) {
  return database.oneOrNone(`SELECT * FROM animais WHERE id = ${id}`);
};

exports.saveAnimal = function (animal) {
  return database.one(
    "INSERT INTO animais (pasto, piquete, femea, idade, identidade, nome) VALUES ($1, $2, $3, $4, $5, $6) returning *",
    [animal.pasto, animal.piquete, animal.femea, animal.idade, animal.identidade, animal.nome]
  );
};

exports.updateAnimal = function (id, animal) {
  return database.none(
    "UPDATE animais SET pasto = $1, piquete = $2, femea = $3, idade = $4, identidade = $5, nome = $6 WHERE id = $7",
    [animal.pasto, animal.piquete, animal.femea, animal.idade, animal.identidade, animal.nome, id]
  );
};

exports.deleteAnimal = function (id) {
  return database.none(`DELETE FROM animais WHERE id = ${id}`);
};
