const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/tracks/:id', (req, res, next) => {
	const trackID = req.params.id; 
	
	res.render('track_analysis', {
		path: 'track_analysis', 
		pageTitle: 'Track Analysis', 
		trackID: trackID
	});
});

module.exports = router; 