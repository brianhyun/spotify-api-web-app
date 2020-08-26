const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/profile', (req, res, next) => {
	// Send GET Requests to Access User-Specific Spotify Info for Playlists, Top Artists, etc.
	const access_token = req.cookies['access_token'];
	
	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
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

	Promise.all([profilePromise, playlistPromise, topArtistsPromise, topTracksPromise, followingPromise])
		.then(function (response) {
			// Data from User's Profile
			const profileResponse = response[0].data;

			const profileImage = library.returnProfileImage(profileResponse);
			const displayName = profileResponse.display_name; 
			const profileSrc = profileResponse.external_urls.spotify;
			const followers = profileResponse.followers.total;
	
			// Data from User's Playlist
			const playlistResponse = response[1].data;
			const playlistCount = playlistResponse.items.length;
	
			// Data from User's Top Artists
			const topArtistsResponse = response[2].data;
			const topArtistsArray = topArtistsResponse.items;

			const topArtistsImageURLs = library.returnImageSourcesFrom(topArtistsArray);
			
			// Data from User's Top Tracks
			const topTracksResponse = response[3].data;
			const topTracksArray = topTracksResponse.items;

			const topTracksImageURLs = library.returnImageSourcesFrom(topTracksArray);
			const trackArtists = library.returnArtistsInfoFrom(topTracksArray);
	
			// Data from User's Following
			const followingResponse = response[4].data;
			const following = followingResponse.artists.total; 
	
			// Render Data
			res.render('profile', {
				path: 'profile',
				pageTitle: 'Dashboard',
				username: displayName, 
				profileSrc: profileSrc,
				profileImage: profileImage, 
				followers: followers,
				playlistCount: playlistCount,
				topArtistsArray: topArtistsArray, 
				topArtistsImageURLs: topArtistsImageURLs,
				topTracksArray: topTracksArray,
				topTracksImageURLs: topTracksImageURLs,
				following: following,
				trackArtists: trackArtists
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