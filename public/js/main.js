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

// Close Button 
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

for (let i = 0; i < headers.length; i++) {
	headers[i].addEventListener("click", () => {
		alert("Clicked!");
	});
}

	// Conditional: If header is active, then do nothing 
	
	// Else, 
		// change current header styling, remove other header styling 
		// show current header body info, remove other header body info 