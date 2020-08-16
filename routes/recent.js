const express = require('express');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.get('/recent', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const recentURL = 'https://api.spotify.com/v1/me/player/recently-played';

	axios.get(recentURL, options)
		.then(function (response) {

			// An array of objects with a nested object that stores information about the recently played track. 
			const recentArray = response.data.items;

			// Create an array that holds all the recently played tracks.
			const tracksArray = [];

			for (let i = 0; i < recentArray.length; i++) {
				tracksArray.push(recentArray[i].track);
			}

			// Push tracks array into library function. 
			// Returns an array of arrays, with each nested array holding info about the artists on each track. 
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
			console.log(error);
		});
});

module.exports = router; 