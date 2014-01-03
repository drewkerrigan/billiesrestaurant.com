/***********************************************/
/*               About This File               */
/***********************************************/
/*
	This file contains most of the specific
	javascript for the theme frontend.

*/

/***********************************************/
/*              Table of Contents              */
/***********************************************/
/*

	1. Initial Variables

	2. Functions
		2.1 Quote Rotator Function
		2.2 Quote Rotation Started Method
		2.3 Quote Rotation Stopper Method
		2.4 Set Menu Template Width
		2.5 Menu Template Height
		2.6 Page Title Formatting

	3. Initial Setup
		3.1  Initial Variables
		3.2  Foundation Elements
		3.3  Element Beautification
		3.4  Javascript Navigation
		3.5  Tile Setup
		3.6  Header Quote Start
		3.7  Submit Behavior
		3.8  Menu Setup
			 3.8.1 Set Menu Width
			 3.8.2 Next Page Click
			 3.8.3 Previous Page Click
			 3.8.4 Set Menu Height
		3.9  Header Menu Arrow
		3.10 Page Title Formatting

	4. On Resize Actions
		4.1 Hidden Custom Select Widths
		4.2 Content Only Slider Height
		4.3 Menu Template Width
		4.3 Page Title Formatting

*/

/***********************************************/
/*             1. Initial Variables            */
/***********************************************/

var quoteRotator = [];
var menuPage = 1;


/***********************************************/
/*                2. Functions                 */
/***********************************************/

// 2.1 Quote Rotator Function
function quoteRotate( id ) {
	var quotes = jQuery( id );
	var current = quotes.find( '.quote:visible' );
	var next = current.next();
	if( next.length === 0 ) {
		next = quotes.find('.quote:first' );
	}

	current.fadeOut( function() {
		next.fadeIn();
	});

}


// 2.2 Quote Rotation Started Method
function startQuoteRotation( id ) {
	if( jQuery( id ).find( '.quote' ).length > 1 ) {
		quoteRotator[id] = setInterval( function() { quoteRotate( id ); }, 5000 );
	}
}

// 2.3 Quote Rotation Stopper Method
function stopQuoteRotation() {
	clearInterval(quoteRotator[id]);
}

// 2.4 Set Menu Template Width
function set_menu_width() {

	var menuWidth = jQuery( '.trcMenuWindow' ).width();
	menuWidth = ( menuWidth > 964 ) ? 964 : menuWidth;
	jQuery( '.trcMenuPage' ).width( menuWidth );

}

// 2.5 Menu Template Height
function set_menu_height( target, animate ) {
	if( target === '' || target === null || typeof target == 'undefined' ) {
		target = jQuery( '.trcMenuPage:first' );
	}

	if( animate == 'yes' ) {
		var target = jQuery( '.trcMenuPage[data-page="' + menuPage + '"]' ).height();
		jQuery( '.trcMenuWindow' ).animate( {height: target + 'px'} );
	}
	else {
		jQuery( '.trcMenuWindow' ).height( jQuery( '.trcMenuPage[data-page="' + menuPage + '"]' ).height() );
	}
}

// 2.6 Page Title Formatting
function format_page_titles() {
	if( jQuery( '.page-title.js' ).length > 0 ) {
		jQuery.each( jQuery('.page-title.js'), function() {
			var width = jQuery(this).width();
			var titleWidth = jQuery(this).find( 'h1' ).outerWidth();
			var toDistribute = ( width - titleWidth ) / 2;
			toDistribute = Math.floor( toDistribute ) -1;

			jQuery(this).find( '.dashed' ).width( toDistribute );
		});
	}
}


jQuery( document ).ready( function( $ ) {

	/***********************************************/
	/*               3. Initial Setup              */
	/***********************************************/

	// 3.1 Initial Variables

	var maxMenuPage =  jQuery( '.trcMenuPage' ).length;


	// 3.2 Foundation Elements
	var $doc = $(document), Modernizr = window.Modernizr;
	$.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
	$.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;

	// 3.3 Element Beautification
	$( '.select-load' ).addClass('shown');
	$( 'select').customSelect();
	$( '.select-load' ).removeClass('shown');
	$('input[type="submit"]').customSubmit();
	$( '.nojs' ).removeClass( 'nojs' ).addClass( 'js' );

	// 3.4 Javascript Navigation
	jQuery( '#headerDropdown select' ).on( 'change', function() {
		window.location = jQuery(this).val();
	});

	// 3.5 Tile Setup
	jQuery('.tiles').bonsaiTiles();

	// 3.6 Header Quote Star
	if ( jQuery( '#headerQuotes .quote' ).length > 1 && jQuery( '#headerQuotes' ).hasClass('style-cycle') === true ) {
		startQuoteRotation( '#headerQuotes' );
	}
	if ( jQuery( '#footerQuotes .quote' ).length > 1 && jQuery( '#footerQuotes' ).hasClass('style-cycle') === true ) {
		startQuoteRotation( '#footerQuotes' );
	}

	// 3.7 Submit Behavior
	$( '.button.submit' ).on( 'click', function(){
		$(this).parents( 'form' ).submit();
	});


	/*********************************/
	/*        3.8 Menu Setup         */
	/*********************************/

	// 3.8.1 Set Menu Width
	set_menu_width();

	// 3.8.2 Next Page Click
	jQuery( '.trcMenuNext' ).on( 'click', function() {
		var next = menuPage + 1;
		if( menuPage == maxMenuPage -1 ) {
			jQuery( '.trcMenuNext' ).hide();
		}
		var target = jQuery( '.trcMenuPage[data-page="' + next + '"]' );
		menuPage = next;

		jQuery( '.trcMenuWindow' ).scrollTo( target, 400, { axis: 'x'} );
		jQuery( '.trcMenuPrev' ).show();
		set_menu_height( target, 'yes' );
	});

	// 3.8.3 Previous Page Click
	jQuery( '.trcMenuPrev' ).on( 'click', function() {
		var next = menuPage - 1;
		if( next == 1 ) {
			jQuery( '.trcMenuPrev' ).hide();
		}
		var target = jQuery( '.trcMenuPage[data-page="' + next + '"]' );
		menuPage = next;
		jQuery( '.trcMenuNext' ).show();
		jQuery( '.trcMenuWindow' ).scrollTo( target, 400, { axis: 'x'} );
		set_menu_height( target, 'yes' );
	});

	// 3.8.4 Set Menu Height
	set_menu_height();

	// 3.9 Header Menu Arrow (only needed if fallback )
	if ( jQuery( '#headerMenu > div > ul' ).hasClass( 'menu' ) === false ) {
		jQuery.each( jQuery( '#headerMenu > div > ul li' ), function() {
			if( $(this).hasClass( 'current_page_item' ) || $(this).hasClass( 'current_page_parent' ) || $(this).hasClass( 'current_page_ancestor' ) ) {
				$(this).prepend( '<div class="arrow-container"><div class="arrow"></div></div>' );
			}
		})
	}

	// 3.10 Page Title Formatting
	format_page_titles();

	// 3.11 Menu Animation
	jQuery('#headerMenu > div > ul > li').hover(
	    function () {
	        var submenuheight = jQuery(this).find('.sub-container').attr('submenuheight');
	        if (!submenuheight) {
	            var submenuheight = jQuery(this).find('.sub-container').height();
	            jQuery(this).find('.sub-container').attr('submenuheight', submenuheight)
	        }

	        jQuery(this).find('.sub-container').show(0).height('0px').stop().animate({
	            height: submenuheight
	        }, 200);
	    },
	    function () {
	        jQuery(this).find('.sub-container').css('display', 'block').stop().animate({
	            height: '0px'
	        }, 200).hide(0);
	    }
	);


});

jQuery(window).on("debouncedresize", function( event ) {

	/***********************************************/
	/*             4. On Window Resize             */
	/***********************************************/

	// 4.1 Hidden Custom Select Widths
	jQuery( '.customSelectInner' ).css( 'width', '100%' );

	// 4.2 Content Only Slider Height
	if( jQuery(window).width() < 767 ) {
		var maxHeight = 0;
		var height = 0;
		jQuery.each( jQuery('.content-only'), function() {
			jQuery.each( $(this).find('.slide .slide-content'), function(){
				height = $(this).height();
				if( height > maxHeight ) {
					maxHeight = height;
				}
			});
			maxHeight = maxHeight + 22;
			jQuery(this).find('.slide').css( 'height', maxHeight + 'px' );
			jQuery(this).css( 'height', maxHeight + 'px' );
		});
	}

	// 4,3 Menu Template Width
	set_menu_width();

	// 4.4 Page Title Formatting
	format_page_titles();

});
