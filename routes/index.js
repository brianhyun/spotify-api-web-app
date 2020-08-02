const https = require('https');

const express = require('express');

const state = require('../utils/state');
// const { auth_endpoint, client_id, redirect_uri } = require('../utils/config');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		pageTitle: 'Analyzer'
	});
});

router.post('/', (req, res, next) => {
	// auth endpoint: https://accounts.spotify.com/authorize
	// parameters: client_id, response_type, redirect_uri, state 
	const authEndpoint = `${process.env.auth_endpoint}?client_id=${process.env.client_id}&response_type=code&redirect_uri=${process.env.redirect_uri}&state=${state}`;
	https.get(authEndpoint, (response) => {
		response.on('data', (d) => {
		  process.stdout.write(d);
		});
	}).on('error', (e) => {
		console.error(e);
	});
});

module.exports = router; 