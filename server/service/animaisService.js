const animaisData = require('../data/animaisData');

exports.getAnimais = function () {
  return animaisData.getAnimais();
};

exports.getAnimal = async function (id) {
  const animal = await animaisData.getAnimal(id);
  if (!animal) throw new Error('Animal not found!');
  return animal;
};

exports.saveAnimal = async function (animal) {
  const existingAnimal = await animaisData.getAnimalByIdentidade(animal.identidade);
  if (existingAnimal) {
    throw new Error('Animal already exixts!');
  }
  return animaisData.saveAnimal(animal);
}

exports.updateAnimal = async function (id, animal) {
  await exports.getAnimal(id);
  return animaisData.updateAnimal(id, animal);
}

exports.deleteAnimal = function (id) {
  return animaisData.deleteAnimal(id);
};
