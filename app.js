const bodyParser = require('body-parser');
const express = require('express');

const loginRouter = require('./routes/login');
const callbackRouter = require('./routes/callback');
const profileRouter = require('./routes/profile');
const artistsRouter = require('./routes/artists');
const tracksRouter = require('./routes/tracks');
const playlistsRouter = require('./routes/playlists');
const recentRouter = require('./routes/recent');
const trackAnalysisRouter = require('./routes/track_analysis');
const albumsRouter = require('./routes/albums');

const errorController = require('./controllers/errorPage');
const refreshTokenController = require('./controllers/refreshToken');

const { port } = require('./utils/config');

const app = express(); 

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(refreshTokenController);
app.use(loginRouter);
app.use(callbackRouter);
app.use(profileRouter);
app.use(artistsRouter);
app.use(tracksRouter);
app.use(playlistsRouter);
app.use(recentRouter);
app.use(trackAnalysisRouter);
app.use(albumsRouter);

// 404 Handling
app.use(errorController);

app.listen(process.env.PORT || port, () => {
	console.log('Example app running on port', port);
});