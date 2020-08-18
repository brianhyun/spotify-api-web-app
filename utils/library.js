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
	const timeInSeconds = timeInMilli / 1000; 
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
}

/* 
	Takes in the array of user's playlists and returns an array of each playlist's image urls. 

	If a playlist doesn't have an image, then use personal asset as substitute. 
	Otherwise, grab the first image.  
*/

module.exports.returnPlaylistImageSourcesFrom = (playlistsArray) => {
	const playlistsImageURLs = [];

	const noImageURLSrc = 'img/playlist-no-image.png';
	
	for (let i = 0; i < playlistsArray.length; i++) {
		if (playlistsArray[i].images.length === 0) {
			playlistsImageURLs.push(noImageURLSrc);
		} else {
			playlistsImageURLs.push(playlistsArray[i].images[0].url);
		}
	}	

	return playlistsImageURLs;
};

