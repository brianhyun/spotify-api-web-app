const express = require('express');

const axios = require('axios');

const router = express.Router();

router.get('/profile', (req, res, next) => {
	const access_token = req.query.token;
	
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
			// console.log(topArtistsArray[0]);
			
			// Data from User's Top Tracks
			const topTracksResponse = response[3].data;
			const topTracksArray = topTracksResponse.items;
			// console.log(topTracksArray[0]);
	
			const trackArtists = [];
	
			// Iterate through tracks and put artist's info into object and push into tracks array.
			for (let i = 0; i < topTracksArray.length; i++) {
				const artists = [];
				// For each track, make an object for each artist. 
				for(let j = 0; j < topTracksArray[i].artists.length; j++) {
					let artist = {};
					artist.name = topTracksArray[i].artists[j].name;
					artist.url = topTracksArray[i].artists[j].external_urls.spotify;
					artists.push(artist);
				}
	
				// Push artists array into artist. 
				trackArtists.push(artists);
			}
	
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
				topTracksArray: topTracksArray, 
				following: following,
				trackArtists: trackArtists
			});
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router;