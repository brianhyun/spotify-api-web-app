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
				const topArtistsURL = 'https://api.spotify.com/v1/me/top/artists';
				const topTracksURL = 'https://api.spotify.com/v1/me/top/tracks';
				const followingURL = 'https://api.spotify.com/v1/me/following?type=artist';

				const profilePromise = axios.get(profileURL, options);
				const playlistPromise = axios.get(playlistURL, options);
				const topArtistsPromise = axios.get(topArtistsURL, options);
				const topTracksPromise = axios.get(topTracksURL, options);
				const followingPromise = axios.get(followingURL, options);

				return Promise.all([profilePromise, playlistPromise, topArtistsPromise, topTracksPromise, followingPromise]);
			})
			.then(function (response) {
				// Data from User's Profile
				const profileResponse = response[0].data;
				const profileImage = profileResponse.images[0].url;
				const displayName = profileResponse.display_name; 
				const profileSrc = profileResponse.external_urls.spotify;
				const followers = profileResponse.followers.total;

				// Data from User's Playlist
				const playlistResponse = response[1].data;
				const playlistCount = playlistResponse.items.length;

				// Data from User's Top Artists
				const topArtistsResponse = response[2].data;
				const topArtistsArray = topArtistsResponse.items;
				console.log(topArtistsArray[0]);
				
				// Data from User's Top Tracks
				const topTracksResponse = response[3].data;
				const topTracksArray = topTracksResponse.items;
				console.log(topTracksArray[0]);

				const trackArtists = [];

				// Iterate through tracks and combine artists' names into comma-separated string.
				for (let i = 0; i < topTracksArray.length; i++) {
					const artists = [];
					for(let j = 0; j < topTracksArray[i].artists.length; j++) {
						artists.push(topTracksArray[i].artists[j].name);
					}
					trackArtists.push(artists.join(', '));
				}

				// Data from User's Following
				const followingResponse = response[4].data;
				const following = followingResponse.artists.total; 

				// Render Data
				res.render('dashboard-home', {
					pageTitle: 'Dashboard',
					username: displayName, 
					profileSrc: profileSrc,
					profileImage: profileImage, 
					followers: followers,
					playlistCount: playlistCount,
					topArtistsArray: topArtistsArray, 
					topTracksArray: topTracksArray, 
					following: following,
					trackArtists: trackArtists
				});
			})
		  	.catch(function (error) {
				console.log(error.response.data);
			});
	}
});

module.exports = router;