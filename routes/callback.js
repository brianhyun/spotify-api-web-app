const express = require('express');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const queryString = require('qs');

const { redirect_uri, token_endpoint, client_id, client_secret } = require('../utils/config');

const router = express.Router();

router.use(cookieParser());

router.get('/callback', (req, res, next) => {
	// If an error exists within the query string, then the client either denied permission or an error occurred.
		// On both accounts, send the user back to the login screen with the error message in the queryString. 
	// Otherwise, send client to personal dashboard. 
	const errorMessage = req.query.error;

	if (errorMessage) {
		res.redirect('/#' +
			queryString.stringify({
				error: errorMessage
		}));
	} else {
		// Grab Auth Code and State from Query String
		const authCode = req.query.code || null;
		const state = req.query.state || null;
		const storedState = req.cookies ? req.cookies['stateKey'] : null;

		// Check State Parameter
		if (state === null || state !== storedState) {
			res.redirect('/#' +
				queryString.stringify({
					error: 'state_mismatch'
			}));
		} else {
			// Clear Cookies for State
			res.clearCookie('stateKey');

			// Send Post Request to Receive Access Token
			const data = queryString.stringify({
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
					// Retrieve Access Token and Refresh Token
					const accessToken = response.data.access_token;
					const refreshToken = response.data.refresh_token;
	
					// Set Cookies and Redirect to Profile Router
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
					res.redirect('/#' +
						queryString.stringify({
							error: 'invalid_token'
					}));
				});
		}
	}
});

module.exports = router;