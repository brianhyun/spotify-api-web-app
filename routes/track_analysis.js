const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const queryString = require('qs');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/tracks/:id', (req, res, next) => {
	// Send GET Requests to Access Track Audio Features
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

			const trackImage = library.returnImageSourcesFrom(trackInfo);
			const trackArtists = library.returnArtistsInfoFrom(trackInfo);
			const trackTime = library.returnTrackTimesFrom(trackInfo);

			// Data from Track Features 
			const rawTrackFeatures = response[1].data;
			const trackFeatures = library.returnTranslatedAudioFeatures(rawTrackFeatures);

			res.render('track_analysis', {
				path: 'track_analysis', 
				pageTitle: 'Track Analysis', 
				trackInfo: trackInfo,
				trackArtists: trackArtists, 
				rawTrackFeatures: JSON.stringify(rawTrackFeatures),
				trackFeatures: trackFeatures,
				trackTime: trackTime,
				trackImage: trackImage
			});
		})
		.catch(function (error) {
			console.log(error.response);

			if (error.response.data.error.message === 'The access token expired') {
				res.redirect('/refresh_token?' + 
					queryString.stringify({
						path: 'tracks',
						id: trackID
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