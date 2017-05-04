const express = require('express');
const morgan = require('morgan');

const app = express();

const getPostRouter = require('./getPostRouter');
const deletePutRouter = require('./deletePutRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.use('/blog-posts', getPostRouter);
app.use('/blog-posts/:id', deletePutRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});