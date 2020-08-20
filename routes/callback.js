const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const qs = require('qs');

const { redirect_uri, token_endpoint, client_id, client_secret } = require('../utils/config');

const router = express.Router();

router.use(cookieParser());

router.get('/callback', (req, res, next) => {
	// If an error exists within the query string, then the client either denied permission or an error occurred.
		// If client denied permission, then send them back to the home page. 
		// If an error occurred, then send them to the error page. 
	// Otherwise, send client to personal dashboard. 
	if (req.query.error) {
		res.render('index', {
			path: 'index',
			pageTitle: 'Analyzer'
		});
	} else {
		// Grab Auth Code from Query String
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

		// Send Post Request to Receive Access Token
		axios.post(token_endpoint, data, options)
			.then(function (response) {
				const accessToken = response.data.access_token;
				const refreshToken = response.data.refresh_token;

				// Set Cookie and Redirect to Profile Router
				const options = {
					maxAge: 24 * 60 * 60 * 1000,
					httpOnly: true,
				};

				res.cookie('auth_code', authCode, options);
				res.cookie('access_token', accessToken, options);
				res.cookie('refresh_token', refreshToken, options);
				res.redirect('/profile');
			})
			.catch(function (error) {
				console.log(error.response);
			});
	}
});

module.exports = router;