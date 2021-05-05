const axios = require('axios');
// const crypto = require('crypto');
const animaisService = require('../service/animaisService');

// const randomString = function (numBytes) {
//   return crypto.randomBytes(numBytes).toString('hex');
// }

const randomNumber = function (low, high) {
  return Math.random() * (high - low) + low;
}

const randomInteger = function (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

const request = function (method, url, data) {
  return axios({url, method, data});
}


test('Obter todos os animais', async function () {
  // Given
  const animal1 = await animaisService.saveAnimal({ codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) });
  const animal2 = await animaisService.saveAnimal({ codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) });
  const animal3 = await animaisService.saveAnimal({ codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) });
  // When
  const response = await request('GET', 'http://localhost:3000/animais');
  const animais = response.data;
  // Then
  expect(animais).toHaveLength(3);
  await animaisService.deleteAnimal(animal1.id);
  await animaisService.deleteAnimal(animal2.id);
  await animaisService.deleteAnimal(animal3.id);
});


test('Obter um animal', async function () {
  // Given
  const data = await animaisService.saveAnimal({ codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) });
  // When
  const response = await request('GET', `http://localhost:3000/animais/${data.id}`);
  const animal = response.data;
  // Then
  expect(animal.codigo).toBe(data.codigo);
  expect(animal.peso).toBe(data.peso);
  await animaisService.deleteAnimal(animal.id);
});


test('Adicionar um animal', async function () {
  // Given
  const data = { codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) };
  // When
  const response = await request('POST', 'http://localhost:3000/animais', data);
  const createdAnimal = response.data;
  // Then
  expect(createdAnimal.codigo).toBe(String(data.codigo));
  expect(createdAnimal.peso).toBe(data.peso);
  await animaisService.deleteAnimal(createdAnimal.id);
});


test('Atualizar um animal', async function () {
  // Given
  const data = { codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) };
  const animalCreated = await animaisService.saveAnimal(data);
  const newData = { codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) };
  // When
  const response = await request('PUT', `http://localhost:3000/animais/${animalCreated.id}`, newData);
  // Then
  const animal = await animaisService.getAnimal(animalCreated.id);
  expect(animal.codigo).toBe(String(newData.codigo));
  expect(animal.peso).toBe(newData.peso);
  await animaisService.deleteAnimal(animal.id);
});


test('Deletar um animal', async function () {
  // Given
  const data = { codigo: randomInteger(0, 10000), peso: randomNumber(0, 300) };
  const animalCreated = await animaisService.saveAnimal(data);
  // When
  const response = await request('DELETE', `http://localhost:3000/animais/${animalCreated.id}`);
  // Then
  const posts = await animaisService.getAnimais();
  expect(posts).toHaveLength(0);
});