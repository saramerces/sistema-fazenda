const database = require('../infra/database');

exports.getAnimais = function () {
  return database.query("SELECT * FROM animais;");
};

exports.getAnimal = function (id) {
  return database.oneOrNone(`SELECT * FROM animais WHERE id = ${id}`);
};

exports.getAnimalByIdentidade = function (identidade) {
  return database.oneOrNone(`SELECT * FROM animais WHERE identidade = ${identidade}`);
};

exports.saveAnimal = function (animal) {
  return database.one(
    "INSERT INTO animais (pasto, piquete, femea, categoria, lote, identidade) VALUES ($1, $2, $3, $4, $5, $6) returning *",
    [animal.pasto, animal.piquete, animal.femea, animal.categoria, animal.lote, animal.identidade]
  );
};

exports.updateAnimal = function (id, animal) {
  return database.none(
    "UPDATE animais SET pasto = $1, piquete = $2, femea = $3, categoria = $4, lote = $5, identidade = $6 WHERE id = $7",
    [animal.pasto, animal.piquete, animal.femea, animal.categoria, animal.lote, animal.identidade, id]
  );
};

exports.deleteAnimal = function (id) {
  return database.none(`DELETE FROM animais WHERE id = ${id}`);
};
