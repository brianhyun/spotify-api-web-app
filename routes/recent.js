const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/recent', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const playlistURL = 'https://api.spotify.com/v1/me/playlists';

	axios.get(playlistURL, options)
		.then(function (response) {

			console.log(response.data);

			res.render('recent', {
				path: 'recent', 
				pageTitle: 'Recently Played'
			});
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router; 