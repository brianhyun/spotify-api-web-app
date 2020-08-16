const express = require('express');

const { auth_endpoint, client_id, redirect_uri } = require('../utils/config');

const router = express.Router();

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

// Tentative Scopes
// user-read-playback-state, user-read-currently-playing user-library-read user-read-playback-position

router.post('/login', (req, res, next) => {
	const scopes = 'playlist-read-private user-top-read user-follow-read user-read-recently-played';
	res.redirect(`${auth_endpoint}?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
});

module.exports = router; 