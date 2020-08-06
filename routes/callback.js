const express = require('express');
const axios = require('axios');
const qs = require('qs');

const { redirect_uri, token_endpoint, client_id, client_secret } = require('../utils/config');

const router = express.Router();

router.get('/callback', (req, res, next) => {
	// If an error exists within the query string, then the client either denied permission or an error occurred.
	// If so, send them back to home page. (According to OAUTH convention, an error message must be shown.)
	// Otherwise, send client to personal dashboard. 
	if (req.query.error) {
		res.render('index', {
			pageTitle: 'Analyzer'
		});
	} else {
		const authCode = req.query.code;

		const data = qs.stringify({
			grant_type: 'authorization_code',
			code: authCode,
			redirect_uri: redirect_uri,
			client_id: client_id,
			client_secret: client_secret
		});

		const options = {
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		};

		axios.post(token_endpoint, data, options)
		  	.then(function (response) {
				const options = {
					headers: {'Authorization': `Bearer ${response.data.access_token}`}
				};

				const profileURL = 'https://api.spotify.com/v1/me';
				const playlistURL = 'https://api.spotify.com/v1/me/playlists';

				const profilePromise = axios.get(profileURL, options);
				const playlistPromise = axios.get(playlistURL, options);

				return Promise.all([profilePromise, playlistPromise]);
			})
			.then(function (response) {
				// Data from User's Profile
				const profileResponse = response[0].data;
				const displayName = profileResponse.display_name; 
				const followers = profileResponse.followers.total;

				// Data from User's Playlise
				const playlistResponse = response[1].data;
				const playlistLength = playlistResponse.items.length;

				// Render Data
				res.render('dashboard', {
					pageTitle: 'Dashboard',
					username: displayName, 
					followers: followers,
					playlistLength: playlistLength
				});
			})
		  	.catch(function (error) {
				console.log(error.response.data);
			});
	}
});

module.exports = router;