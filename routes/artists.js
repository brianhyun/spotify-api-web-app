const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/artists', (req, res, next) => {
	const access_token = req.cookies['access_token'];

	const options = {
		headers: {'Authorization': `Bearer ${access_token}`}
	};

	const topArtistsURL = 'https://api.spotify.com/v1/me/top/artists';

	axios.get(topArtistsURL, options)
		.then(function (response) {
			console.log(response);
			res.render('artists', {
				page_name: 'artists', 
				pageTitle: 'Artists'
			})
		})
		.catch(function (error) {
			console.log(error);
		});
});

module.exports = router; 