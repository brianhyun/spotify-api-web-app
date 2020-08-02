const https = require('https');

const express = require('express');

const { auth_endpoint, client_id } = require('../utils/config');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		pageTitle: 'Analyzer'
	});
});

router.post('/', (req, res, next) => {
	const authEndpoint = `${auth_endpoint}?client_id=${client_id}&response_type=code&redirect_uri=`;
	https.get(authEndpoint, (response) => {
		response.on('data', (d) => {
		  process.stdout.write(d);
		});
	}).on('error', (e) => {
		console.error(e);
	});
});

module.exports = router; 