const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const queryString = require('qs');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/tracks', (req, res, next) => {
	// Send GET Request to Access Track Info
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const topTracksURL = 'https://api.spotify.com/v1/me/top/tracks';

	axios.get(topTracksURL, options)
		.then(function (response) {
			const topTracksArray = response.data.items;
			
			const trackImageURLs = library.returnImageSourcesFrom(topTracksArray);
			const trackArtists = library.returnArtistsInfoFrom(topTracksArray);
			const trackTimes = library.returnTrackTimesFrom(topTracksArray);

			res.render('tracks', {
				path: 'tracks', 
				pageTitle: 'Tracks',
				topTracksArray: topTracksArray, 
				trackArtists: trackArtists,
				trackTimes: trackTimes,
				trackImageURLs: trackImageURLs
			})
		})
		.catch(function (error) {
			console.log(error); 
			
			res.redirect('/refresh_token?' + 
				queryString.stringify({
					path: 'tracks'
			}));
		});
});

module.exports = router; 