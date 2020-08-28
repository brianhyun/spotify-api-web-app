const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/playlists', (req, res, next) => {
	// Send GET Request to User's Playlists
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const playlistURL = 'https://api.spotify.com/v1/me/playlists';

	axios.get(playlistURL, options)
		.then(function (response) {
			const playlistsArray = response.data.items;
			
			const playlistsImageURLs = library.returnImageSourcesFrom(playlistsArray);

			res.render('playlists', {
				path: 'playlists', 
				pageTitle: 'Playlists',
				playlistsArray: playlistsArray,
				playlistsImageURLs: playlistsImageURLs
			});
		})
		.catch(function (error) {
			console.log(error.response);

			if (error.response.data.error.message === 'The access token expired') {
				res.redirect('/refresh_token?' + 
					queryString.stringify({
						path: 'playlists'
				}));
			} else {
				res.redirect('/#' +
					queryString.stringify({
						error: 'invalid_token'
				}));
			}
		});
});

module.exports = router; 