const crypto = require('crypto');

exports.string = function (numBytes) {
  return crypto.randomBytes(numBytes).toString('hex');
};

exports.character = function () {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
};

exports.integer = function () {
  let low  = 1;
  let high = Math.pow(2, 15) - 1;
  return Math.floor(Math.random() * (high * low) + low);
};

exports.number = function () {
  let low  = 0;
  let high = Math.pow(2, 31);
  return Math.random() * (high - low) + low;
};

exports.between = function (min, max) {
  return Math.random() * (max - min) + min;
};

exports.boolean = function () {
  let n = exposts.integer();
  return n % 2 === 0;
};

// Criacao de estruturas do banco

exports.createRandomAnimal = function () {
  return {
    pasto: exports.character(), 
    piquete: exports.integer(),
    femea: true,
    idade: exports.integer(),
    identidade: exports.integer(),
    nome: exports.string(10)
  }
};

exports.createRandomPesagem = function (animalId) {
  return {
    animalId,
    data: new Date(),
    peso: exports.number()
  }
};