const https = require('https');

const bodyParser = require('body-parser');
const express = require('express');

const indexRouter = require('./routes/index');
const callbackRouter = require('./routes/callback');
const errorController = require('./controllers/error');

const app = express(); 

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Route Handling
app.use(indexRouter);
app.use(callbackRouter);

// 404 Handling
app.use(errorController);

app.listen(process.env.PORT || 3000, () => {
	console.log('Example app running on port', 3000);
});