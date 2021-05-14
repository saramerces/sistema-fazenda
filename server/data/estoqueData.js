const database = require('../infra/database');

exports.getEstoque = function () {
  return database.query("SELECT * FROM estoque;");
};

exports.getProduto = function (produtoId) {
  return database.oneOrNone("SELECT * FROM estoque WHERE id = $1", [produtoId]);
};

exports.saveProduto = function (produto) {
  return database.one(
    "INSERT INTO estoque (nome, quantidade, preco, fabricante, tipo, nota_fiscal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [produto.nome, produto.quantidade, produto.preco, produto.fabricante, produto.tipo, produto.notaFiscal]
  );
};

exports.updateProduto = function (id, produto) {
  return database.none(
    "UPDATE estoque SET nome = $1, quantidade = $2, preco = $3, fabricante = $4, tipo = $5, nota_fiscal = $6 WHERE id = $7",
    [produto.nome, produto.quantidade, produto.preco, produto.fabricante, produto.tipo, produto.notaFiscal, id]
  )
};

exports.deleteProduto = function (id) {
  return database.none(`DELETE FROM estoque WHERE id = ${id}`);
};
