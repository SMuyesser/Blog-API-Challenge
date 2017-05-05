const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
	"Manchester United Beats Celta Vigo", "MUFC beat Celta Vigo today with a score of 1-0.  Marcus Rashford scored a great free kick just outside the box", "Sinan Muyesser");

BlogPosts.create(
	"Manchester United's Path to Champions' League", "If Manchester can win this tournament, they will qualify for UCL next year.", "Sinan Muyesser");

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

module.exports = router;