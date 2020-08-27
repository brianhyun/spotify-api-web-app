const express = require('express');
const cookieParser = require('cookie-parser');

const { auth_endpoint, client_id, redirect_uri } = require('../utils/config');
const state = require('../utils/state');

const router = express.Router();

router.use(cookieParser());

router.get('/', (req, res, next) => {
	res.render('login', {
		path: 'login',
		pageTitle: 'Analyzer'
	});
});

// Scopes in Use
// playlist-read-private: Get a List of Current User's Playlists
// user-top-read: Get a User's Top Artists and Tracks
// user-follow-read: Get User's Followed Artists
// user-read-recently-played: Get Current User's Recently Played Tracks
// user-library-read: Get Current User's Saved Albums

router.post('/login', (req, res, next) => {
	// Set Cookie for State
	const options = {
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
	};

	res.cookie('stateKey', state, options);

	// Redirect to Callback Router (Handles Access Token Retrieving)
	const scopes = 'playlist-read-private user-top-read user-follow-read user-read-recently-played user-library-read';
	res.redirect(`${auth_endpoint}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${state}`);
});

module.exports = router; 