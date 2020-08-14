/* 
	Takes in the array of top tracks and returns an array of arrays. 

	Each nested array contains one or more objects containing info (e.g. name and url) 
	about each artist that participated on that particular track. 
*/

module.exports = (topTracksArray) => {
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