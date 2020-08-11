// Hide Navbar on Login Page
if (window.location.pathname === "/") {
	const navbar = document.querySelector("nav");
	navbar.style.display = "none";
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

// Main Dashboard - Toggle Artists and Tracks Display
const headers = document.getElementsByClassName("main-dash__top-stats-menu-header");
const topTracks = document.getElementById("top-tracks");
const topTracksContainer = document.getElementsByClassName("main-dash__top-tracks-container");
const topArtists = document.getElementById("top-artists");
const topArtistsContainer = document.getElementsByClassName("main-dash__top-artists-container")

topTracks.addEventListener("click", () => {
	// Remove active styling for all headers. 
	for (let i = 0; i < headers.length; i++) {
		headers[i].classList.remove("main-dash__top-stats-menu-header--active");
	}

	// Add active styling for current header. 
	topTracks.classList.add("main-dash__top-stats-menu-header--active");

	// Hide Top Artists Container 
	topTracksContainer[0].style.display = "grid";

	// Show Top Tracks Container 
	topArtistsContainer[0].style.display = "none";
});


topArtists.addEventListener("click", () => {
	// Remove active styling for all headers. 
	for (let i = 0; i < headers.length; i++) {
		headers[i].classList.remove("main-dash__top-stats-menu-header--active");
	}

	// Add active styling for current header. 
	topArtists.classList.add("main-dash__top-stats-menu-header--active");

	// Hide Top Artists Container 
	topTracksContainer[0].style.display = "none";

	// Show Top Tracks Container 
	topArtistsContainer[0].style.display = "grid";
});