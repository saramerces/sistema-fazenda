const express = require('express');
const router = express.Router();

const animaisService = require('../service/animaisService');

router.get('/animais', async function (req, res) {
  const animais = await animaisService.getAnimais();
  return res.status(200).json(animais);
});

router.get('/animais/:id', async function (req, res) {
  const animalId = req.params.id;
  try {
    const animal = await animaisService.getAnimal(animalId);
    return res.status(200).json(animal);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.post('/animais', async function (req, res) {
  const animal = req.body;
  try {
    const newAnimal = await animaisService.saveAnimal(animal);
    return res.status(201).json(newAnimal);
  } catch (e) {
    return res.status(409).send(e.message);
  }
});

router.put('/animais/:id', async function (req, res) {
  const data = req.body;
  try {
    await animaisService.updateAnimal(req.params.id, data);
    return res.status(200).end();
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

router.delete('/animais/:id', async function (req, res) {
  await animaisService.deleteAnimal(req.params.id);
  return res.status(204).end();
});


module.exports = router;
