const express = require('express');

const { auth_endpoint, client_id, redirect_uri } = require('../utils/config');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', {
		pageTitle: 'Analyzer'
	});
});

// Scopes 
// playlist-read-private: Get a List of Current User's Playlists

router.post('/', (req, res, next) => {
	const scopes = 'playlist-read-private user-follow-modify user-read-playback-state user-read-currently-playing playlist-read-private user-library-read user-top-read user-read-playback-position user-read-recently-played';
	res.redirect(`${auth_endpoint}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
});

module.exports = router; 