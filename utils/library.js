/* 
	Purpose: A single track can have multiple artists, with each artist having a unique url for their Spotify page. 

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
	Purpose: Spotify stores the duration of tracks in milliseconds and this function converts it into mm::ss format. 

	Input:  
		(1) an array of objects (array of user's top tracks) OR
			(a) each object is a track
		(2) an object, which stores information on a single track

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
	Purpose: Some playlists and tracks don't have images, so a proper substitute must be issued to prevent a site crash. 

	Input: 
		(1) an array of user's playlists OR
		(2) an array of users' top tracks OR 
		(3) an object containing information about a single track 

	Output: Returns an array of each playlist's, tracks', or track's image URL(s). 

	The 'pushImageURLToArray' functions takes in an array. The array contains objects. Each object has an images array. 
	The images array stores objects. Each object has a 'url' property that stores the URL at which the track or playlist image resource resides. 
	Everything that is passed into this function must be an array of objects, with each object having an images array. 

	If a playlist or track doesn't have an image, then use personal asset as substitute. Otherwise, grab the first image.  
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
	Purpose: Spotify uses numbers to represent a track's audio features (i.e. key, modality, etc.), which need to be translated to understandable terms. 

	Input: object containing information about a track's audio features (e.g. modality: 0)

	Output: object containing translated information about a track's audio features (e.g. modality: "Major")
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
	Purpose: User might not have a profile picture. If not, then replace with personal asset to prevent a site crash. 
	
	Input: object containing information about the user's profile

	Output: string of the relative (if using personal asset) or absolute (if user has profile picture hosted on Spotify's server) path of the profile picture
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