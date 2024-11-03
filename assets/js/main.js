/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['361px', '736px'],
		xsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	$nav_links
		.on('click', function (event) {

			var href = $(this).attr('href');

			// Not a panel link? Bail.
			if (href.charAt(0) != '#'
				|| $panels.filter(href).length == 0)
				return;

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Change panels.
			if (window.location.hash != href)
				window.location.hash = href;

		});

	// Panels.


	const handleAnimation=()=>{
		if(! $('#gallerySlider')){
			return
		}
		const imageUrls = [
			'images/pic02.png',
			'images/pic01.webp',
			'images/pic03.jpg',
			'images/me.jpg',
			// Add more URLs as needed
		  ];
		  
	 
		  
		  let currentIndex = 0;
		  
		  setInterval(() => {
			$('#gallerySlider').fadeOut(500, function() {
			  $(this).attr('src', imageUrls[currentIndex]).fadeIn(500);
			  currentIndex = (currentIndex + 1) % imageUrls.length;
			});
		  }, 1800);
	}
	handleAnimation()
	const handleLoadAgent = (agentName) => {
		$('#agentTab').removeClass('hidden');
		// debugger
		var defaultHtmlContent = `agents/empty.html`;

		if (agentName) {
			defaultHtmlContent = `agents/${agentName}.html?t=${new Date().getTime()}`;
		}
		$.ajax({
			url: defaultHtmlContent,
			method: 'GET',
			dataType: 'html',
			success: function (data) {
				$('#agentIframe').html(data);
				// code to be executed after the template is loaded
			}
		});


	}
	// Initialize.
	(function () {

		var $panel, $link;

		if (window.location.search) { 
			const urlParams = new URLSearchParams(window.location.search);
			const agentName = urlParams.get('agentName');
 
			localStorage.setItem('agent-target', (agentName));
			location.href='#agent'; 

		}
		// Get panel, link.
		if (window.location.hash) {

			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

		}

		// No panel/link? Default to first.
		if (!$panel
			|| $panel.length == 0) {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels except this one.
		$panels.not($panel)
			.addClass('inactive')
			.hide();

		// Activate link.
		$link
			.addClass('active');

		// Reset scroll.
		$window.scrollTop(0);

	})();

	// agent click event.
	$(document).on('click', '[data-agent-target]', function (event) {
		var agentName = $(this).attr('data-agent-target')
		localStorage.setItem('agent-target', (agentName));
		// debugger
	});
	// Hashchange event.
	$window.on('hashchange', function (event) { 
		var $panel, $link;

		// Get panel, link.
		if (window.location.hash) {

			$('#agentTab').addClass('hidden');
			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

			// No target panel? Bail.
			if ($panel.length == 0)
				return;


			if (window.location.hash === '#agent') {
				const agentName = localStorage.getItem('agent-target');
				handleLoadAgent(agentName);
				localStorage.setItem('agent-target', '');
			}

		}

		// No panel/link? Default to first.
		else {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels.
		$panels.addClass('inactive');

		// Deactivate all links.
		$nav_links.removeClass('active');

		// Activate target link.
		$link.addClass('active');

		// Set max/min height.
		$main
			.css('max-height', $main.height() + 'px')
			.css('min-height', $main.height() + 'px');

		// Delay.
		setTimeout(function () {

			// Hide all panels.
			$panels.hide();

			// Show target panel.
			$panel.show();

			// Set new max/min height.
			$main
				.css('max-height', $panel.outerHeight() + 'px')
				.css('min-height', $panel.outerHeight() + 'px');

			// Reset scroll.
			$window.scrollTop(0);

			// Delay.
			window.setTimeout(function () {

				// Activate target panel.
				$panel.removeClass('inactive');

				// Clear max/min height.
				$main
					.css('max-height', '')
					.css('min-height', '');

				// IE: Refresh.
				$window.triggerHandler('--refresh');

				// Unlock.
				locked = false;

			}, (breakpoints.active('small') ? 0 : 500));

		}, 250);

	});

	// IE: Fixes.
	if (browser.name == 'ie') {

		// Fix min-height/flexbox.
		$window.on('--refresh', function () {

			$wrapper.css('height', 'auto');

			window.setTimeout(function () {

				var h = $wrapper.height(),
					wh = $window.height();

				if (h < wh)
					$wrapper.css('height', '100vh');

			}, 0);

		});

		$window.on('resize load', function () {
			$window.triggerHandler('--refresh');
		});

		// Fix intro pic.
		$('.panel.intro').each(function () {

			var $pic = $(this).children('.pic'),
				$img = $pic.children('img');

			$pic
				.css('background-image', 'url(' + $img.attr('src') + ')')
				.css('background-size', 'cover')
				.css('background-position', 'center');

			$img
				.css('visibility', 'hidden');

		});

	}

})(jQuery);