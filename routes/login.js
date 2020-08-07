const express = require('express');

const { auth_endpoint, client_id, redirect_uri } = require('../utils/config');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('login', {
		pageTitle: 'Analyzer'
	});
});

// Scopes 
// playlist-read-private: Get a List of Current User's Playlists
// user-top-read: Get a User's Top Artists and Tracks
// user-follow-read: Get User's Followed Artists

router.post('/login', (req, res, next) => {
	const scopes = 'playlist-read-private user-top-read user-follow-read user-read-playback-state user-read-currently-playing user-library-read user-read-playback-position user-read-recently-played';
	res.redirect(`${auth_endpoint}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
});

module.exports = router; 