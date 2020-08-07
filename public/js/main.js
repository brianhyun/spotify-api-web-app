// Hide navbar on login page. 
if (window.location.pathname === "/") {
	const navbar = document.querySelector("nav");
	navbar.style.display = "none";
}

// Main Dashboard - Toggle Artists and Tracks Display
