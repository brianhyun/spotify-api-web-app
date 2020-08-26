const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const queryString = require('qs');

const { token_endpoint, client_id, client_secret } = require('../utils/config');

const router = express.Router();

router.use(cookieParser());

router.get('/refresh_token', (req, res, next) => {
	// Send POST Request to Retrieve New Access Token
	const refresh_token = req.cookies['refresh_token'];

	const data = queryString.stringify({
		grant_type: 'refresh_token',
		refresh_token: refresh_token,
		client_id: client_id,
		client_secret: client_secret
	});

	const options = {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	};

	axios.post(token_endpoint, data, options)
		.then(function (response) {
			const new_access_token = response.data.access_token;

			const options = {
				maxAge: 24 * 60 * 60 * 1000,
				httpOnly: true,
			};

			res.clearCookie('access_token');
			res.cookie('access_token', new_access_token, options);
			console.log('New Access Token Acquired');
			console.log('New Access Token:', new_access_token);
			res.redirect('back');
		})
		.catch(function (error) {
			console.log(error.response);
			res.redirect('/#' +
				queryString.stringify({
					error: 'invalid_refresh_token'
			}));
		});
});

module.exports = router;
