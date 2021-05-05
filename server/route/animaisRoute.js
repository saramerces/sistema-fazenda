const express = require('express');
const router = express.Router();

const animaisService = require('../service/animaisService');

router.get('/animais', async function (req, res) {
  const animais = await animaisService.getAnimais();
  return res.json(animais);
});

router.get('/animais/:id', async function (req, res) {
  const animalId = req.params.id;
  const animal = await animaisService.getAnimal(animalId);
  return res.json(animal);
});

router.post('/animais', async function (req, res) {
  const animal = req.body;
  const newAnimal = await animaisService.saveAnimal(animal);
  console.log(newAnimal);
  res.json(newAnimal);
});

router.put('/animais/:id', async function (req, res) {
  const data = req.body;
  await animaisService.updateAnimal(req.params.id, data);
  return res.end();
});

router.delete('/animais/:id', async function (req, res) {
  await animaisService.deleteAnimal(req.params.id);
  return res.end();
});

module.exports = router;