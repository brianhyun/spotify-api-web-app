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

		axios.post(token_endpoint, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		  	})
		  	.then(function (response) {
				console.log(response.data);
		  	})
		  	.catch(function (error) {
				console.log(error);
		  	});
	}
});

module.exports = router;