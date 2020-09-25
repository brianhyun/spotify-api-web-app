// Fade Out CSS Loader on Page Load
$(window).on('load', () => {
	$('.loader-wrapper').fadeOut('slow');
});

// Hide Navbar on Login Page
if (window.location.pathname === "/") {
	$('nav').hide(); 
	$('main').css('margin', '0');
}

// Chart Logic 
const regExp = /\/tracks\/./;

if (regExp.test(window.location.pathname)) {
	const data = JSON.parse(document.getElementById('passed_data').dataset.test);
	const ctx = document.getElementById('track-analysis__feature-analysis-graph-canvas').getContext('2d');
	const myChart = new Chart(ctx, {
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
						fontColor: "#e7e7e7",
						fontSize: 13,
						beginAtZero: true
					},
					gridLines: {
						color: "#9d9d9d25"
					}
				}],
				xAxes: [{
					ticks: {
						fontColor: "#e7e7e7",
						fontSize: 13
					},
					gridLines: {
						color: "#9d9d9d25"
					}
				}],
			}
		}
	});
}

// Hamburger Menu Function
$('#hamburger-menu').click(function() {
	// Hide Hamburger Menu 
	$(this).hide(); 

	// Remove Padding on Menu
	$('.main-navbar').css('padding', '0');

	// Show Nav Menu 
	$('#navigation-menu').css('display', 'flex');
});	

// Close Button Function
$('#close-btn').click(function() {
	// Show Hamburger Menu 
	$('#hamburger-menu').css('display', 'flex');

	// Add Padding on Menu
	$('.main-navbar').css('padding', '4.5rem 3.5rem');

	// Show Nav Menu 
	$('#navigation-menu').hide();
});	

if (window.location.pathname === "/profile") {
	// Profile Page - Toggle Artists and Tracks Display
	$('#top-tracks').click(function() {
		// Remove active styling for all headers. 
		$('.profile__top-stats-menu-header').removeClass("profile__top-stats-menu-header--active");

		// Add active styling for current header. 
		$(this).addClass("profile__top-stats-menu-header--active");

		// Show Top Tracks Container 
		$('#profile__top-tracks-container').css('display', 'grid');

		// Hide Top Artists Container
		$('#profile__top-artists-container').hide(); 
	});

	$('#top-artists').click(function() {
		// Remove active styling for all headers. 
		$('.profile__top-stats-menu-header').removeClass("profile__top-stats-menu-header--active");

		// Add active styling for current header. 
		$(this).addClass("profile__top-stats-menu-header--active");

		// Show Top Artists Container 
		$('#profile__top-artists-container').css('display', 'grid');

		// Hide Top Tracks Container
		$('#profile__top-tracks-container').hide(); 
	});
}