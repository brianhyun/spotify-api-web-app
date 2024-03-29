const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const queryString = require('qs');

const library = require('../utils/library');

const router = express.Router();

router.use(cookieParser());

router.get('/albums', (req, res, next) => {
	// Send Get Request to Albums URL
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const albumURL = 'https://api.spotify.com/v1/me/albums';

	axios.get(albumURL, options)
		.then(function (response) {
			const albumsResponse = response.data.items;

			// Prepare Data for Library Functions
			const albumsArray = [];

			for (let i = 0; i < albumsResponse.length; i++) {
				albumsArray.push(albumsResponse[i].album);
			}

			const albumsImageURLs = library.returnImageSourcesFrom(albumsArray); 
			const albumsArtists = library.returnArtistsInfoFrom(albumsArray); 

			res.render('albums', {
				path: 'albums', 
				pageTitle: 'Albums',
				albumsArray: albumsArray,
				albumsImageURLs: albumsImageURLs,
				albumsArtists: albumsArtists
			});
		})
		.catch(function (error) {
			console.log(error); 
			
			res.redirect('/refresh_token?' + 
				queryString.stringify({
					path: 'albums'
			}));
		});
});

module.exports = router; 