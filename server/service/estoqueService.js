const estoqueData = require('../data/estoqueData');

const formatFromTableToJson = function (produto) {
  return {
    id: produto.id,
    nome: produto.nome,
    quantidade: produto.quantidade,
    preco: produto.preco,
    fabricante: produto.fabricante,
    tipo: produto.tipo,
    notaFiscal: produto.nota_fiscal
  };
};

exports.getEstoque = function () {
  const todosProdutos = estoqueData.getEstoque()
    .then(data => {
      if (data.length == 0) {
        return data;
      } else {
        return data.map(element => formatFromTableToJson(element));
      }
    })
    .catch(_ => { return new Array(0); });
  return todosProdutos;
};

exports.getProduto = async function (produtoId) {
  const data = await estoqueData.getProduto(produtoId);
  if (!data) {
    throw new Error("Product not found");
  }
  return formatFromTableToJson(data);
};

exports.saveProduto = async function (produto) {
  const newProduto = await estoqueData.saveProduto(produto);
  return formatFromTableToJson(newProduto);
};

exports.updateProduto = async function (id, produto) {
  const existingProduct = await exports.getProduto(id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }
  return estoqueData.updateProduto(id, produto);
};

exports.deleteProduto = function (id) {
  estoqueData.deleteProduto(id);
};
