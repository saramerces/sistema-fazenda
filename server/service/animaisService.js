const animaisData = require('../data/animaisData');

exports.getAnimais = function () {
  return animaisData.getAnimais();
};

exports.getAnimal = function (id) {
  return animaisData.getAnimal(id);
};

exports.saveAnimal = function (animal) {
  return animaisData.saveAnimal(animal);
}

exports.updateAnimal = function (id, animal) {
  return animaisData.updateAnimal(id, animal);
}

exports.deleteAnimal = function (id) {
  return animaisData.deleteAnimal(id);
};
