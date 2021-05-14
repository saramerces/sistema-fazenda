const express = require('express');
const router = express.Router();

const pesagensService = require('../service/pesagensService');

router.get('/pesagens', async function (req, res) {
  const pesagens = await pesagensService.getPesagens();
  return res.status(200).json(pesagens);
});


router.get('/pesagens/:id', async function (req, res) {
  try {
    const pesagem = await pesagensService.getPesagem(req.params.id);
    return res.status(200).json(pesagem);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

// router.get('/pesagens/:id', async function (req, res) {});

router.post('/pesagens', async function (req, res) {
  const pesagemData = req.body;
  try {
    const createdPesagem = await pesagensService.savePesagem(pesagemData);
    return res.status(201).json(createdPesagem);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});


// router.put('/pesagens/:id', async function (req, res) {});


router.delete('/pesagens/:id', async function (req, res) {
  try {
    await pesagensService.deletePesagem(req.params.id);
    return res.status(204).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});


module.exports = router;
