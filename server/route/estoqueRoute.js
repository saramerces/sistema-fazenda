const express = require('express');
const router = express.Router();

const estoqueService = require('../service/estoqueService');


router.get('/estoque', async function (req, res) {
  const produtos = await estoqueService.getEstoque();
  return res.status(200).json(produtos);
});

router.get('/estoque/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const produto = await estoqueService.getProduto(id);
    return res.status(200).json(produto);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.post('/estoque', async function (req, res) {
  const produto = req.body;
  const newProduto = await estoqueService.saveProduto(produto);
  return res.status(201).json(newProduto).end();
});

router.put('/estoque/:id', async function (req, res) {
  const data = req.body;
  try {
    await estoqueService.updateProduto(req.params.id, data);
    return res.status(200).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.delete('/estoque/:id', async function (req, res) {
  const id = req.params.id;
  try {
    await estoqueService.deleteProduto(id);
    return res.status(204).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

module.exports = router;
