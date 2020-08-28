const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/recent', (req, res, next) => {
	// Send GET Request to User's Recently Played Songs
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const recentURL = 'https://api.spotify.com/v1/me/player/recently-played';

	axios.get(recentURL, options)
		.then(function (response) {
			// An array of objects with a nested object that stores information about the recently played track. 
			const recentArray = response.data.items;
			
			// Prepare Data for Library Functions
			const tracksArray = [];

			for (let i = 0; i < recentArray.length; i++) {
				tracksArray.push(recentArray[i].track);
			}

			const trackImageURLs = library.returnImageSourcesFrom(tracksArray);
			const trackArtists = library.returnArtistsInfoFrom(tracksArray);
			const trackTimes = library.returnTrackTimesFrom(tracksArray);

			res.render('recent', {
				path: 'recent', 
				pageTitle: 'Recently Played',
				recentArray: recentArray,
				trackArtists: trackArtists,
				trackTimes: trackTimes,
				trackImageURLs: trackImageURLs
			});
		})
		.catch(function (error) {
			console.log(error.response);

			if (error.response.data.error.message === 'The access token expired') {
				res.redirect('/refresh_token?' + 
					queryString.stringify({
						path: 'recent'
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