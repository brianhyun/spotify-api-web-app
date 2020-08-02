const express = require('express');

const router = express.Router();

router.get('/callback', (req, res, next) => {
	res.render('callback', {
		pageTitle: 'The Waiting Room'
	});
});

module.exports = router; 