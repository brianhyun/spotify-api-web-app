const bodyParser = require('body-parser');
const express = require('express');

const loginRouter = require('./routes/login');
const callbackRouter = require('./routes/callback');
const profileRouter = require('./routes/profile');
const errorController = require('./controllers/error');
const { port } = require('./utils/config');

const app = express(); 

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(loginRouter);
app.use(callbackRouter);
app.use(profileRouter);

// 404 Handling
app.use(errorController);

app.listen(process.env.PORT || port, () => {
	console.log('Example app running on port', port);
});