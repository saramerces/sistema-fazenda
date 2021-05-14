/**
 * Testes de API para os endpoints voltados para os rescuros de informações de
 * estoque de produtos.
 * 
 * id           INT
 * nome         STRING(50)
 * quantidade   INT
 * preco        INT
 * fabricante   STRING(50)
 * tipo         STRING(50)
 * nota_fiscal  STRING
 */

const axios = require('axios');
const random = require('./randomValues');
const estoqueService = require('../service/estoqueService');

const request = function (method, url, data) {
  return axios({ url, method, data, validateStatus: false });
}
 
const createRandomProduct = function () {
  return {
    nome: random.string(25),
    quantidade: random.integer(),
    preco: Math.floor(random.between(10000, 90000)),
    fabricante: random.string(25),
    tipo: random.string(25),
    notaFiscal: random.string(50)
  };
};

// Testes
//
// GET    /estoque     200 OK
// GET    /estoque/:id 200 OK
// GET    /estoque/:id 404 Not Found
// POST   /estoque     201 Created
// POST   /estoque     409
// PUT    /estoque/:id 200 OK
// PUT    /estoque/:id 404 Not Found
// DELETE /estoque/:id 204 No Content 
// DELETE /estoque/:id 404 Not Found

test("Obter todos os produtos em estoque", async function () {
  const produto1 = await estoqueService.saveProduto( createRandomProduct() );
  const produto2 = await estoqueService.saveProduto( createRandomProduct() );
  const produto3 = await estoqueService.saveProduto( createRandomProduct() );
  const response = await request('GET', 'http://localhost:8080/estoque');
  expect(response.status).toBe(200);
  expect(response.data).toHaveLength(3);
  await estoqueService.deleteProduto(produto1.id);
  await estoqueService.deleteProduto(produto2.id);
  await estoqueService.deleteProduto(produto3.id);
});


test("Obter um produto específico do estoque", async function () {
  const produto1 = await estoqueService.saveProduto( createRandomProduct() );
  const response = await request('GET', `http://localhost:8080/estoque/${produto1.id}`);
  const receivedProd = response.data;
  expect(response.status).toBe(200);
  expect(receivedProd.id).toBe(produto1.id);
  expect(receivedProd.nome).toBe(produto1.nome);
  await estoqueService.deleteProduto(produto1.id);
});


test("Tentar obter um produto que não existe", async function () {
  const id = 111;
  const response = await request('GET', `http://localhost:8080/estoque/${id}`);
  expect(response.status).toBe(404);
});


test("Cadastrar um novo produto no estoque", async function () {
  const data = createRandomProduct();
  const response = await request('POST', 'http://localhost:8080/estoque', data);
  const produto = response.data;
  expect(response.status).toBe(201);
  expect(produto.nome === data.nome).toBe(true);
  await estoqueService.deleteProduto(produto.id);
});


// test.todo("Tentar cadastrar um produto com um nome existente");


test("Atualizar as informações de um produto", async function () {
  const data = createRandomProduct();
  const produto1 = await estoqueService.saveProduto(data);
  const newData = createRandomProduct();
  const response = await request('PUT', `http://localhost:8080/estoque/${produto1.id}`, newData);
  expect(response.status).toBe(200);
  const produto = await estoqueService.getProduto(produto1.id);
  expect(produto.nome === newData.nome).toBe(true);
  expect(produto.fabricante === newData.fabricante).toBe(true);
  expect(produto.notaFiscal === newData.notaFiscal).toBe(true);
  await estoqueService.deleteProduto(produto.id);
});


// Deixando a execucao dos testes muito lenta
//
// (!)Lento
// test("Tentar atualizar um produto inexistente", async function (req, res) {
//   const id = 2;
//   const newData = createRandomProduct();
//   const response = await request('PUT', `http://localhost:8080/estoque/${id}`, newData);
//   expect(response.status).toBe(404);
// });
//
// (!)Lento
test("Apagar um produto do estoque", async function () {
  const produto1 = await estoqueService.saveProduto( createRandomProduct() );
  const response = await request('DELETE', `http://localhost:8080/estoque/${produto1.id}`);
  expect(response.status).toBe(204);
  const todosProdutos = await estoqueService.getEstoque();
  expect(todosProdutos).toHaveLength(0);
});
