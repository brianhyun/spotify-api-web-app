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
			
			const tracksArray = [];

			for (let i = 0; i < recentArray.length; i++) {
				tracksArray.push(recentArray[i].track);
			}

			const trackArtists = library.returnArtistsInfoFrom(tracksArray);
			const trackTimes = library.returnTrackTimesFrom(tracksArray);

			res.render('recent', {
				path: 'recent', 
				pageTitle: 'Recently Played',
				recentArray: recentArray,
				trackArtists: trackArtists,
				trackTimes: trackTimes
			});
		})
		.catch(function (error) {
			console.log(error.response);

			if (error.response.data.error.message === 'The access token expired') {
				console.log('Access Token Expired');
				res.redirect('/refresh_token');
			} else {
				res.redirect('/#' +
					queryString.stringify({
						error: 'invalid_token'
				}));
			}
		});
});

module.exports = router; 