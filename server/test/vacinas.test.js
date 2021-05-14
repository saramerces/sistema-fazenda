/**
 * Testes de API para os endpoints voltados para os rescuros de informações de
 * estoque de produtos.
 * 
 * id           INT
 * tipo_vacina  STRING
 * data_vacina  DATE
 * id_produto   INT  references estoque(id)
 */

const axios = require('axios');
const random = require('./randomValues');
const estoqueService = require('../service/estoqueService');
const vacinasService = require('../service/vacinasService');

const createRandomVacina = function (estoqueId) {
  return {
    tipoVacina: random.string(30),
    produtoId: estoqueId
  }
};

const request = async function (method, url, data) {
  return axios({ url , method, data, validateStatus: false });
};


test("Obter todas as vacinas", async function () {
  const produto1 = await estoqueService.saveProduto( random.createRandomProduct() );
  const produto3 = await estoqueService.saveProduto( random.createRandomProduct() );
  const produto2 = await estoqueService.saveProduto( random.createRandomProduct() );
  const vacina1 = await vacinasService.saveVacina( createRandomVacina(produto1.id) );
  const vacina2 = await vacinasService.saveVacina( createRandomVacina(produto2.id) );
  const vacina3 = await vacinasService.saveVacina( createRandomVacina(produto3.id) );
  const response = await request('GET', `http://localhost:8080/vacinas`);
  const vacinas = response.data;
  expect(response.status).toBe(200);
  expect(vacinas).toHaveLength(3);
  await vacinasService.deleteVacina(vacina1.id);
  await vacinasService.deleteVacina(vacina2.id);
  await vacinasService.deleteVacina(vacina3.id);
  await estoqueService.deleteProduto(produto1.id);
  await estoqueService.deleteProduto(produto2.id);
  await estoqueService.deleteProduto(produto3.id);
});


test("Obter uma vacina pelo id", async function () {
  const produto1 = await estoqueService.saveProduto( random.createRandomProduct() );
  const vacina1 = await vacinasService.saveVacina( createRandomVacina(produto1.id) );
  const response = await request('GET', `http://localhost:8080/vacinas/${vacina1.id}`);
  const vacina = response.data;
  expect(response.status).toBe(200);
  expect(vacina.tipoVacina === vacina1.tipoVacina).toBe(true);
  await vacinasService.deleteVacina(vacina.id);
  await estoqueService.deleteProduto(produto1.id);
});


test("Tentar obter uma vacina que não existe", async function () {
  const id = 12;
  const response = await request('GET', `http://localhost:8080/vacinas/${id}`);
  expect(response.status).toBe(404);
});


test("Cadastrar uma nova vacina", async function () {
  const produto1 = await estoqueService.saveProduto( random.createRandomProduct() ); 
  const inputData = createRandomVacina(produto1.id);
  const response = await request('POST', `http://localhost:8080/vacinas`, inputData);
  expect(response.status).toBe(201);
  expect(response.data.produtoId).toBe(produto1.id);
  await vacinasService.deleteVacina(response.data.id);
  await estoqueService.deleteProduto(produto1.id);
});


test("Atualizar informações de uma vacina", async function () {
  const produto1 = await estoqueService.saveProduto( random.createRandomProduct() );
  const vacina1 = await vacinasService.saveVacina( createRandomVacina(produto1.id) );
  const newData = createRandomVacina(produto1.id);
  const response = await request('PUT', `http://localhost:8080/vacinas/${vacina1.id}`, newData);
  expect(response.status).toBe(200);
  await vacinasService.deleteVacina(vacina1.id);
  await estoqueService.deleteProduto(produto1.id);
});


test("Apagar um vacina", async function () {
  const produto1 = await estoqueService.saveProduto( random.createRandomProduct() );
  const vacina1 = await vacinasService.saveVacina( createRandomVacina(produto1.id) );
  const response = await request('DELETE', `http://localhost:8080/vacinas/${vacina1.id}`);
  expect(response.status).toBe(204);
  const vacinas = await vacinasService.getVacinas();
  expect(vacinas).toHaveLength(0);
  await estoqueService.deleteProduto(produto1.id);
});
