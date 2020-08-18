const express = require('express');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.get('/tracks/:id', (req, res, next) => {
	const trackID = req.params.id; 
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const trackInfoURL = `https://api.spotify.com/v1/tracks/${trackID}`;
	const trackFeaturesURL = `https://api.spotify.com/v1/audio-features/${trackID}`;

	const trackInfoPromise = axios.get(trackInfoURL, options);
	const trackFeaturesPromise = axios.get(trackFeaturesURL, options);

	Promise.all([trackInfoPromise, trackFeaturesPromise])
		.then(function (response) {
			// Data from Track Info
			const trackInfo = response[0].data;

			const trackArtists = library.returnArtistsInfoFrom(trackInfo);
			const trackTime = library.returnTrackTimesFrom(trackInfo);

			// Data from Track Features 
			const trackFeatures = response[1].data;

			res.render('track_analysis', {
				path: 'track_analysis', 
				pageTitle: 'Track Analysis', 
				trackInfo: trackInfo, 
				trackArtists: trackArtists, 
				trackFeatures: trackFeatures,
				trackTime: trackTime
			});
		})
		.catch(function (error) {
			console.log(error.response);
		});
});

module.exports = router; 