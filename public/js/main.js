// Hide Navbar on Login Page
if (window.location.pathname === "/") {
	const navbar = document.querySelector("nav");
	navbar.style.display = "none";
}

// Chart Logic 
const regExp = /\/tracks\/./;

if (regExp.test(window.location.pathname)) {
	const data = JSON.parse(document.getElementById('passed_data').dataset.test);
	var ctx = document.getElementById('track-analysis__feature-analysis-graph-canvas').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Danceability', 'Energy', 'Speechiness', 'Loudness (x10^-1)', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence'],
			datasets: [{
				data: [data.danceability, data.energy, data.speechiness, Math.abs(data.loudness) / 10, data.acousticness, data.instrumentalness, data.liveness, data.valence],
				backgroundColor: [
					'rgba(46, 204, 113, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(232, 67, 147, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(230, 126, 34, 0.2)',
					'rgba(192, 57, 43, 0.2)'
				],
				borderColor: [
					'rgba(46, 204, 113, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(232, 67, 147, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(230, 126, 34, 1)',
					'rgba(192, 57, 43, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			responsiveness: true, 
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

// Hamburger Menu Function
const mainNav = document.getElementsByClassName("main-navbar");
const hamburgerMenu = document.getElementById("hamburger-menu");
const navigationMenu = document.getElementById("navigation-menu");
const mainSection = document.getElementsByTagName("main");

hamburgerMenu.addEventListener("click", () => {
	// Hide Hamburger Menu
	hamburgerMenu.style.display = "none";

	// Remove Padding on Menu
	mainNav[0].style.padding = "0";

	// Hide Main Section
	mainSection[0].style.display = "none";

	// Show Nav Menu 
	navigationMenu.style.display = "flex";
});	

// Navbar Close Button 
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
	// Show Hamburger Menu 
	hamburgerMenu.style.display = "flex";

	// Add Padding on Menu 
	mainNav[0].style.padding = "4.5rem 3.5rem";

	// Hide Main Section
	mainSection[0].style.display = "flex";

	// Hide Nav Menu 
	navigationMenu.style.display = "none";
});

// Profile Page - Toggle Artists and Tracks Display
const headers = document.getElementsByClassName("profile__top-stats-menu-header");
const topTracks = document.getElementById("top-tracks");
const topTracksContainer = document.getElementById("profile__top-tracks-container");
const topArtists = document.getElementById("top-artists");
const topArtistsContainer = document.getElementById("profile__top-artists-container")

topTracks.addEventListener("click", () => {
	// Remove active styling for all headers. 
	for (let i = 0; i < headers.length; i++) {
		headers[i].classList.remove("profile__top-stats-menu-header--active");
	}

	// Add active styling for current header. 
	topTracks.classList.add("profile__top-stats-menu-header--active");

	// Hide Top Artists Container 
	topTracksContainer.style.display = "grid";

	// Show Top Tracks Container 
	topArtistsContainer.style.display = "none";
});


topArtists.addEventListener("click", () => {
	// Remove active styling for all headers. 
	for (let i = 0; i < headers.length; i++) {
		headers[i].classList.remove("profile__top-stats-menu-header--active");
	}

	// Add active styling for current header. 
	topArtists.classList.add("profile__top-stats-menu-header--active");

	// Hide Top Artists Container 
	topTracksContainer.style.display = "none";

	// Show Top Tracks Container 
	topArtistsContainer.style.display = "grid";
});