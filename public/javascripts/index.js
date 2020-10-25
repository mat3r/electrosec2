document.addEventListener('DOMContentLoaded', function() {

	// SIDENAV
	const sideNav = document.querySelector('.sidenav');
	M.Sidenav.init(sideNav, {});

	// PARALLAX IMAGE
	const parallax = document.querySelectorAll('.parallax');
	M.Parallax.init(parallax, {});

	// SCROLLSPY
	const scrlspy = document.querySelectorAll('.scrollspy');
	M.ScrollSpy.init(scrlspy, {});
});
