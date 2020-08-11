// Hide Navbar on Login Page
if (window.location.pathname === "/") {
	const navbar = document.querySelector("nav");
	navbar.style.display = "none";
}

// Hamburger Menu Function
const hamburgerMenu = document.getElementById("hamburger-menu");
const navigationMenu = document.getElementById("navigation-menu");
const mainSection = document.getElementsByTagName("main");

hamburgerMenu.addEventListener("click", () => {
	// Hide Hamburger Menu
	hamburgerMenu.style.display = "none";

	// Hide Main Section
	mainSection[0].style.display = "none";

	// Show Nav Menu 
	navigationMenu.style.display = "flex";
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