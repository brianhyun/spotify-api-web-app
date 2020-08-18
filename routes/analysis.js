const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/analysis', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const playlistURL = 'https://api.spotify.com/v1/me/playlists';

	axios.get(playlistURL, options)
		.then(function (response) {
			res.render('analysis', {
				path: 'analysis', 
				pageTitle: 'Analysis'
			});
		})
		.catch(function (error) {
			console.log(error.response);
		});
});

module.exports = router; 