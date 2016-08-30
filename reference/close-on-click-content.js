// close the menu element if the target itÂ´s not the menu element or one of its descendants..
// content = content-wrap
// isOpen = sidebar is open
// openBtn = menu button
// toggleMenu = !isOpen
content.addEventListener('click', function(ev) {
	let target = ev.target;
	if( isOpen && target !== openbtn ) {
		toggleMenu();
	}
});