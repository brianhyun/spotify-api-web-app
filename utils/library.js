/* 
	Input: 
		(1) an array of objects (array of tracks) OR
			(a) each object stores information about a particular track 
				and each track (which is an object) has a data member that is an array of objects, 
				where each object stores information about a particular artist
			(b) from track.js and recent.js 
		(2) an object (single track)
			(a) the object stores information about a particular track 
			(b) from track_analysis.js

	Output: 
		(1) an array of arrays
			(a) Each nested array contains one or more objects containing info (e.g. name and url) 
			about each artist that participated on that particular track. 
*/

module.exports.returnArtistsInfoFrom = (topTracks) => {
	const trackArtists = [];

	// Single Track Logic: If input is not an array, but a single object...
	if (!Array.isArray(topTracks) && (typeof topTracks) === 'object') {
		for (let i = 0; i < topTracks.artists.length; i++) {
			let artist = {};
			artist.name = topTracks.artists[i].name;
			artist.url = topTracks.artists[i].external_urls.spotify;
			trackArtists.push(artist);
		}

		return trackArtists;
	// Array of Tracks Logic: If input is an array...
	} else if (Array.isArray(topTracks)) {	
		// Iterate through tracks and put artist's info into object and push into tracks array.
		for (let i = 0; i < topTracks.length; i++) {
			const artists = [];
			// For each track, make an object for each artist. 
			for(let j = 0; j < topTracks[i].artists.length; j++) {
				let artist = {};
				artist.name = topTracks[i].artists[j].name;
				artist.url = topTracks[i].artists[j].external_urls.spotify;
				artists.push(artist);
			}
	
			// Push artists array into artist. 
			trackArtists.push(artists);
		}
	
		return trackArtists;
	}
};

/* 
	Spotify stores the duration of the tracks in milliseconds. 

	Input: 
		(1) an array of objects (array of user's top tracks)
			(a) each object is a track OR
		(2) an object 

	Output: an array of each track's time in mm::ss format
*/

const milliToSeconds = (milliseconds) => {
	const timeInSeconds = milliseconds / 1000; 
	const timeInMinutes = Math.trunc(timeInSeconds / 60); 
	const remainingSeconds = Math.trunc(timeInSeconds % 60);
	let timeAsString = '';
	if (remainingSeconds < 10) {
		timeAsString = `${timeInMinutes}:0${remainingSeconds}`;
	} else {
		timeAsString = `${timeInMinutes}:${remainingSeconds}`;
	}
	return timeAsString; 
};

module.exports.returnTrackTimesFrom = (topTracks) => {
	// Single Track Logic: Input is Object, but not Array
	if (!Array.isArray(topTracks) && (typeof topTracks) === 'object') {
		return milliToSeconds(topTracks.duration_ms);
	// Array of Tracks Logic: Input is Array
	} else if (Array.isArray(topTracks)) {
		const trackTimes = [];

		for (let i = 0; i < topTracks.length; i++) {
			trackTimes.push(milliToSeconds(topTracks[i].duration_ms));
		}
	
		return trackTimes;
	}
};

/* 
	Takes in the array of user's playlists and returns an array of each playlist's image urls. 

	If a playlist doesn't have an image, then use personal asset as substitute. 
	Otherwise, grab the first image.  
*/

const pushImageURLToArray = (array) => {
	const imageURLs = [];

	const noImageURLSrc = 'img/no-image.png';

	for (let i = 0; i < array.length; i++) {
		if (array[i].images.length === 0) {
			imageURLs.push(noImageURLSrc);
		} else {
			imageURLs.push(array[i].images[0].url);
		}
	}	

	return imageURLs;
};

module.exports.returnImageSourcesFrom = (array) => {
	// For the Top Tracks Array, each item is an object.
	// There is a nested object that contains the image array. 
	if (!Array.isArray(array) && ((typeof array) === 'object')) {
		const arrayHold = [array.album];
		return pushImageURLToArray(arrayHold);
	} else if ("album" in array[0]) {
		const albumArray = [];

		for (let i = 0; i < array.length; i++) {
			albumArray.push(array[i].album);
		}

		return pushImageURLToArray(albumArray);
	} else {
		return pushImageURLToArray(array); 
	}
};

/* 
	Translate raw audio features into understandable English. 

	Spotify uses numbers to represent key and modality. 
*/

module.exports.returnTranslatedAudioFeatures = (track) => {
	const trackFeatures = {};

	// Tempo 
	trackFeatures.tempo = Math.trunc(track.tempo);

	// Time Signature 
	trackFeatures.time_signature = track.time_signature; 

	// Modality (1 for Major, 0 for Minor)
	if (track.mode === 0) {
		trackFeatures.mode = 'Major';
	} else if (track.mode === 1) {
		trackFeatures.mode = 'Minor';
	} else {
		trackFeatures.mode = 'No Mode Detected';
	}

	// Key 
	switch (track.key) {
		case 0: 
			trackFeatures.key = 'C';
			break;
		case 1: 
			trackFeatures.key = 'C Sharp';
			break;
		case 2: 
			trackFeatures.key = 'D';
			break;
		case 3: 
			trackFeatures.key = 'D Sharp';
			break;
		case 4: 
			trackFeatures.key = 'E';
			break;	
		case 5: 
			trackFeatures.key = 'F';
			break;
		case 6: 
			trackFeatures.key = 'F Sharp';
			break;
		case 7: 
			trackFeatures.key = 'G';
			break;
		case 8: 
			trackFeatures.key = 'G Sharp';
			break;
		case 9: 
			trackFeatures.key = 'A';
			break;
		case 10: 
			trackFeatures.key = 'A Sharp';
			break;
		case 11: 
			trackFeatures.key = 'B';
			break;
		case -1: 
		default: 
			trackFeatures.key = 'No Key Detected';
	}

	return trackFeatures;
};

/* 
	Check User's Profile for Profile Picture Image

	If image exists, then use that. Otherwise, use personal asset (relative path to 'no-profile-picture.png').
*/

module.exports.returnProfileImage = (profileResponse) => {
	let profileImage = '';

	if (profileResponse.images[0]) {
		profileImage = profileResponse.images[0].url;
	} else {
		profileImage = 'img/no-profile-picture.png';
	}

	return profileImage; 
};