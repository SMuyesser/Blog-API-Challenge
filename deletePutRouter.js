const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
	"Real Madrid are Number 1", "Real Madrid currently sit in the 1st place spot in la liga.", "Sinan Muyesser");

BlogPosts.create(
	"Real Madrid could win", "If they continue playing this way, Real Madrid could win another UCL trophy.", "Sinan Muyesser");

router.delete('/', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted the blog post for ${req.params.id}`);
  res.status(204).end();
});

router.put('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post for ${req.params.id}`);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).json(updatedItem);
});

module.exports = router;