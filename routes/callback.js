const express = require('express');

const cookieParser = require('cookie-parser');
const axios = require('axios');
const qs = require('qs');

const { redirect_uri, token_endpoint, client_id, client_secret } = require('../utils/config');

const router = express.Router();

router.use(cookieParser());

router.get('/callback', (req, res, next) => {
	// If an error exists within the query string, then the client either denied permission or an error occurred.
	// If so, send them back to home page. (According to OAUTH convention, an error message must be shown.)
	// Otherwise, send client to personal dashboard. 
	if (req.query.error) {
		res.render('index', {
			page_name: 'index',
			pageTitle: 'Analyzer'
		});
	} else {
		// Grab Authorization Code
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

		// Receive Access Token
		axios.post(token_endpoint, data, options)
			.then(function (response) {
				const accessToken = response.data.access_token;
				// Set Cookie and Redirect to Profile Router
				res.cookie('auth_code', authCode, { maxAge: 900000, httpOnly: true });
				res.cookie('access_token', accessToken, { maxAge: 900000, httpOnly: true });
				res.redirect('/profile');
			})
			.catch(function (error) {
				console.log(error);
			});
	}
});

module.exports = router;