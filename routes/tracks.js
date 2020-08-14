const express = require('express');
const axios = require('axios');

const returnArtistsInfoFrom = require('../utils/trackArtists');

const router = express.Router();

router.get('/tracks', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const topTracksURL = 'https://api.spotify.com/v1/me/top/tracks';

	axios.get(topTracksURL, options)
		.then(function (response) {

			const topTracksArray = response.data.items;

			const trackArtists = returnArtistsInfoFrom(topTracksArray);

			res.render('artists', {
				path: 'tracks', 
				pageTitle: 'Tracks',
				topTracksArray: topTracksArray, 
				trackArtists: trackArtists
			})
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router; 