const https = require('https');

const bodyParser = require('body-parser');
const express = require('express');

const indexRouter = require('./routes/index');
const errorController = require('./controllers/error');
const { port } = require('./utils/config');

const app = express(); 

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Route Handling
app.use(indexRouter);

// 404 Handling
app.use(errorController);

app.listen(port, () => {
	console.log('Example app running on port', port);
});