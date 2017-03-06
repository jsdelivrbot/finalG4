


$(document).ready(function(){
		function reveal10nScroll(){
			var scrolled = $(window).scrollTop();

			$('.kn-p').each(function(){
				var current = $(this),
				w_height = $(window).outerHeight(),
				offsetTop = current.offset().top;

				if (scrolled + w_height-300 > offsetTop) {
					current.addClass('kn-effect');
				}else{
					// current.removeClass('kn-effect');
				}
			})


			$('path').each(function(){
				var current = $(this),
				w_height = $(window).outerHeight(),
				offsetTop = current.offset().top;
				
				if (scrolled + w_height-600 > offsetTop) {
					current.addClass('ff-svg');
				}else{
					// current.removeClass('kn-effect');
				}

			})
		}

		$(window).on("scroll", reveal10nScroll);
		
})

