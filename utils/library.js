/* 
	Takes in an array of user's top tracks and returns an array of arrays. 

	Each nested array contains one or more objects containing info (e.g. name and url) 
	about each artist that participated on that particular track. 
*/

module.exports.returnArtistsInfoFrom = (topTracksArray) => {
	const trackArtists = [];
	
	// Iterate through tracks and put artist's info into object and push into tracks array.
	for (let i = 0; i < topTracksArray.length; i++) {
		const artists = [];
		// For each track, make an object for each artist. 
		for(let j = 0; j < topTracksArray[i].artists.length; j++) {
			let artist = {};
			artist.name = topTracksArray[i].artists[j].name;
			artist.url = topTracksArray[i].artists[j].external_urls.spotify;
			artists.push(artist);
		}

		// Push artists array into artist. 
		trackArtists.push(artists);
	}

	return trackArtists; 
};

/* 
	Takes in an array of user's top tracks and returns an array of the tracks' times in seconds. 

	The time of the tracks are posted in milliseconds. 
	This function returns an array of each track's time in mm::ss format. 
*/

module.exports.returnTrackTimesFrom = (topTracksArray) => {
	const trackTimes = [];

	for (let i = 0; i < topTracksArray.length; i++) {
		const timeInMilli = topTracksArray[i].duration_ms; 
		const timeInSeconds = timeInMilli / 1000; 
		const timeInMinutes = Math.trunc(timeInSeconds / 60); 
		const remainingSeconds = Math.trunc(timeInSeconds % 60);
		let timeAsString = '';
		if (remainingSeconds < 10) {
			timeAsString = `${timeInMinutes}:0${remainingSeconds}`;
		} else {
			timeAsString = `${timeInMinutes}:${remainingSeconds}`;
		}
		trackTimes.push(timeAsString);
	}

	return trackTimes;
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

