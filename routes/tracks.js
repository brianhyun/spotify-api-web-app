const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/tracks', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const topTracksURL = 'https://api.spotify.com/v1/me/top/tracks';

	axios.get(topTracksURL, options)
		.then(function (response) {
			const topTracksArray = response.data.items;

			const trackArtists = library.returnArtistsInfoFrom(topTracksArray);
			const trackTimes = library.returnTrackTimesFrom(topTracksArray);

			res.render('tracks', {
				path: 'tracks', 
				pageTitle: 'Tracks',
				topTracksArray: topTracksArray, 
				trackArtists: trackArtists,
				trackTimes: trackTimes
			})
		})
		.catch(function (error) {
			console.log(error.response);

			if (error.response.data.error.message === 'The access token expired') {
				console.log('Access Token Expired');
				res.redirect('/refresh_token');
			}
		});
});

module.exports = router; 