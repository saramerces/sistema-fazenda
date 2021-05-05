const express = require('express');
const router = express.Router(); 
// O router da a possibilida de distribuir rotas em varios arquivos sem precisar
// instanciar varios "apps" express diferentes

const postsService = require('../service/postsService');

router.get('/posts', async function (req, res) {
  const posts = await postsService.getPosts();
  return res.json(posts);
});

router.post('/posts', async function (req, res) {
  const post = req.body;
  const newPost = await postsService.savePost(post);
  return res.json(newPost);
});

router.put('/posts/:id', async function (req, res) {
  const post = req.body;
  await postsService.updatePost(req.params.id, post);
  res.end();
});

router.delete('/posts/:id', async function (req, res) {
  await postsService.deletePost(req.params.id);
  res.end();
});

module.exports = router;

