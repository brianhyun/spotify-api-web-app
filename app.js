const bodyParser = require('body-parser');
const express = require('express');

const indexRouter = require('./routes/index');
const callbackRouter = require('./routes/callback');
const errorController = require('./controllers/error');
const { port } = require('./utils/config');

const app = express(); 

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(indexRouter);
app.use(callbackRouter);

// 404 Handling
app.use(errorController);

app.listen(process.env.PORT || port, () => {
	console.log('Example app running on port', port);
});