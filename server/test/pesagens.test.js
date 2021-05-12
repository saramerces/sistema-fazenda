const axios = require('axios');
const random = require('./randomValues');

const animaisService = require('../service/animaisService');
const pesagensService = require('../service/pesagensService');

const request = (method, url, data) => {
  return axios({ url, method, data, validateStatus: false });
};

const createRandomAnimal = function () {
  return {
    pasto: random.character(), 
    piquete: random.integer(),
    femea: true,
    idade: random.integer(),
    identidade: random.integer(),
    nome: random.string(10)
  }
};

/**
 * Dados na tabela de Pesagens
 * 
 * id        SERIAL
 * id_animal SERIAL  references animais(id)
 * data      DATE
 * peso      REAL
 */

const createRandomPesagem = function (id) {
  return {
    animalId: id,
    peso: random.between(150, 300)
  }
};

// GET /pesagens 200 OK
// GET /pesagens/:id 200 OK
// GET /pesagens/:id 404 Not Found
// POST /pesagens 201 Created
// DELETE /pesagens/:id 204 No Content

test("Obter todas as pesagens", async function () {
  const animal1 = await animaisService.saveAnimal( createRandomAnimal() );
  const pesagem1 = await pesagensService.savePesagem({ animalId: animal1.id, data: new Date(), peso: random.number() });
  const pesagem2 = await pesagensService.savePesagem({ animalId: animal1.id, data: new Date(), peso: random.number() });
  const pesagem3 = await pesagensService.savePesagem({ animalId: animal1.id, data: new Date(), peso: random.number() });
  const response = await request('GET', 'http://localhost:8080/pesagens');
  const pesagens = response.data;
  expect(response.status).toBe(200);
  expect(pesagens).toHaveLength(3);
  await pesagensService.deletePesagem(pesagem1.id);
  await pesagensService.deletePesagem(pesagem2.id);
  await pesagensService.deletePesagem(pesagem3.id);
  await animaisService.deleteAnimal(animal1.id);
});


test("Obter uma pesagem", async function () {
  const animal1 = await animaisService.saveAnimal( createRandomAnimal() );
  const pesagem1 = await pesagensService.savePesagem({ animalId: animal1.id, data: new Date(), peso: random.number() });
  const response = await request('GET', `http://localhost:8080/pesagens/${pesagem1.id}`);
  const data = response.data;
  expect(response.status).toBe(200);
  expect(data.id).toBe(pesagem1.id);
  expect(data.animalId).toBe(animal1.id);
  await pesagensService.deletePesagem(pesagem1.id);
  await animaisService.deleteAnimal(animal1.id);
});


test("Tentar obter uma pesagem inexistente", async function () {
  const id = 1;
  const response = await request('GET', `http://localhost:8080/pesagens/${id}`);
  expect(response.status).toBe(404);
});


test("Cadastrar nova pesagem", async function () {
  const animal1 = await animaisService.saveAnimal( createRandomAnimal() );
  const pesagem1 = createRandomPesagem(animal1.id);
  const response = await request('POST', 'http://localhost:8080/pesagens', pesagem1);
  const createdPesagem = response.data;
  expect(response.status).toBe(201);
  expect(createdPesagem.animalId).toBe(animal1.id);
  await pesagensService.deletePesagem(pesagem1.id);
  await animaisService.deleteAnimal(animal1.id);
});


test("Deletar uma pesagem", async function () {
  const animal = await animaisService.saveAnimal( createRandomAnimal() );
  const data = createRandomPesagem(animal.id);
  const createdPesagem = await pesagensService.savePesagem(data);
  const response = await request('DELETE', `http://localhost:8080/pesagens/${createdPesagem.id}`);
  expect(response.status).toBe(204);
  const allPesagens = await pesagensService.getPesagens();
  expect(allPesagens).toHaveLength(0);
  await animaisService.deleteAnimal(animal.id);
});
