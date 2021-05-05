const axios = require('axios');
const randv = require('./randomValues');

const animaisService = require('../service/animaisService');

const request = function (method, url, data) {
  return axios({url, method, data});
}

/**
 * Dados na tabela animais:
 *
 * id         SERIAL
 * piquete    SERIAL
 * pasto      CHAR(1)
 * femea      BOOLEAN
 * idade      INTEGER
 * identidade INTEGER
 * nome       VARCHAR(30)
 */

const createRandomAnimal = function () {
  return {
    pasto: randv.character(), 
    piquete: randv.integer(),
    femea: true,
    idade: randv.integer(),
    identidade: randv.integer(),
    nome: randv.string(10)
  }
}

test('Obter todos os animais', async function () {  
  const animal1 = await animaisService.saveAnimal( createRandomAnimal() );
  const animal2 = await animaisService.saveAnimal( createRandomAnimal() );
  const animal3 = await animaisService.saveAnimal( createRandomAnimal() );

  const response = await request('GET', 'http://localhost:8080/animais');
  const animais = response.data;

  expect(animais).toHaveLength(3);
  await animaisService.deleteAnimal(animal1.id);
  await animaisService.deleteAnimal(animal2.id);
  await animaisService.deleteAnimal(animal3.id);
});


test('Obter um animal', async function () {
  const created = await animaisService.saveAnimal( createRandomAnimal() );

  const response = await request('GET', `http://localhost:8080/animais/${created.id}`);
  const animal = response.data;

  expect(animal.id).toBe(created.id);
  expect(animal.piquete).toBe(created.piquete);
  expect(animal.pasto).toBe(created.pasto);
  await animaisService.deleteAnimal(animal.id);
});


test('Adicionar um animal', async function () {
  const data = createRandomAnimal();

  const response = await request('POST', 'http://localhost:8080/animais', data);
  const createdAnimal = response.data;

  expect(createdAnimal.pasto).toBe(String(data.pasto));
  expect(createdAnimal.piquete).toBe(data.piquete);
  expect(createdAnimal.femea).toBe(data.femea);
  expect(createdAnimal.idade).toBe(data.idade);
  expect(createdAnimal.identidade).toBe(data.identidade);
  await animaisService.deleteAnimal(createdAnimal.id);
});


test('Atualizar um animal', async function () {
  const data = createRandomAnimal();
  const animalCreated = await animaisService.saveAnimal(data);
  const newData = createRandomAnimal();

  const response = await request('PUT', `http://localhost:8080/animais/${animalCreated.id}`, newData);

  const animal = await animaisService.getAnimal(animalCreated.id);
  expect(animal.pasto).toBe(newData.pasto);
  expect(animal.piquete).toBe(newData.piquete);
  expect(animal.femea).toBe(newData.femea);
  expect(animal.idade).toBe(newData.idade);
  expect(animal.identidade).toBe(newData.identidade);
  await animaisService.deleteAnimal(animal.id);
});


test('Deletar um animal', async function () {
  const data = createRandomAnimal();
  const animalCreated = await animaisService.saveAnimal(data);

  const response = await request('DELETE', `http://localhost:8080/animais/${animalCreated.id}`);

  const animals = await animaisService.getAnimais();
  expect(animals).toHaveLength(0);
});
