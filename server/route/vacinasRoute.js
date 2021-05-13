const express = require('express');
const router = express.Router();
const vacinasService = require('../service/vacinasService');

router.get('/vacinas', async function (req, res) {
  const vacinas = await vacinasService.getVacinas();
  return res.status(200).json(vacinas);
});

router.get('/vacinas/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const vacina = await vacinasService.getVacina(id);
    return res.status(200).json(vacina);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.post('/vacinas', async function (req, res) {
  const data = req.body;
  try {
    const vacinaCriada = await vacinasService.saveVacina(data);
    return res.status(201).json(vacinaCriada);
  } catch (e) {
    return res.status(409).end();
  }
});

router.put('/vacinas/:id', async function (req, res) {
  const data = req.body;
  try {
    await vacinasService.updateVacina(req.params.id, data);
    return res.status(200).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.delete('/vacinas/:id', async function (req, res) {
  const id = req.params.id;
  try {
    await vacinasService.deleteVacina(id);
    return res.status(204).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

module.exports = router;