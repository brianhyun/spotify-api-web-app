const express = require('express');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.get('/playlists', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const playlistURL = 'https://api.spotify.com/v1/me/playlists';

	axios.get(playlistURL, options)
		.then(function (response) {
			const playlistsArray = response.data.items;
			
			const playlistsImageURLs = library.returnPlaylistImageSourcesFrom(playlistsArray);

			res.render('playlists', {
				path: 'playlists', 
				pageTitle: 'Playlists',
				playlistsArray: playlistsArray,
				playlistsImageURLs: playlistsImageURLs
			});
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router; 