/***********************************************/
/*               About This File               */
/***********************************************/
/*
	This file creates the javascript controls
	needed for the Theme Customizer live
	preview

*/

/***********************************************/
/*              Table of Contents              */
/***********************************************/
/*

	1. Global Declarations

	2. Global Functions
		2.1 Load Sidebar

	3. Theme Option Modifications
		3.1 General Options
		3.2 Header Options
		3.3 Footer Options

*/

/***********************************************/
/*           1. Global Declarations            */
/***********************************************/

/*global wp, trc, stopQuoteRotation, startQuoteRotation */


/***********************************************/
/*             2. Global Functions             */
/***********************************************/

// 2.1. Load Sidebar
function load_sidebar( sidebar ) {
	if( sidebar === '' || typeof sidebar === 'undefined' || sidebar === null ) {
		sidebar = 'trc_default';
	}
	$.ajax({
		url: trc.ajaxurl,
		type: 'post',
		data: {
			action : 'customizer_get_sidebar',
			sidebar: sidebar
		},
		success: function( result ){
			$('#siteSidebar').html( result );
		}
	});

}


/***********************************************/
/*       3. Theme Option Modifications         */
/***********************************************/
( function( $ ) {


	/*********************************/
	/*      3.1  General Options     */
	/*********************************/
	wp.customize( 'body_text_color', function( value ) {
		value.bind( function( newval ) {
			$( 'p,a, .pagination .page-numbers.current' ).not('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .pagination a').css( 'color', newval  );
			$( '.body_text_color_darker' ).css( 'color', $.xcolor.darken( newval, 2, 26 ) );
		});
	});

	wp.customize( 'heading_text_color', function( value ) {
		value.bind( function( newval ) {
			$('h1,h2,h3,h4,h5,h6,h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .heading_text_color').css( 'color', newval  );
			$( '.heading_text_lighter' ).css( 'color', $.xcolor.lighten( newval, 2, 26 ) );
		});
	});

	wp.customize( 'background_color', function( value ) {
		value.bind( function( newval ) {
			$('html').css( 'background-color', newval );
			$('.page-title.nojs, .page-title.js .dashed').css( 'background-color', $.xcolor.darken( newval, 1, 13 ) );
		});
	});

	wp.customize( 'background_image', function( value ) {
		value.bind( function( newval ) {
			$('html').css( 'background-image', 'url(' + newval + ' ) ' );
		});
	});

	wp.customize( 'background_tiling', function( value ) {
		value.bind( function( newval ) {
			$('html').css( 'background-repeat', newval );
		});
	});

	wp.customize( 'content_background', function( value ) {
		value.bind( function( newval ) {
			$('.container, .productHeading h1, .trcMenu .trcMenuItem .title-price h2, .trcMenu .trcMenuItem .title-price .price').css( 'background', newval );
			$('.widget ul li, .widget ul li ul, blockquote').css( 'border-color', $.xcolor.darken( newval, 1, 26 ) );
			$('.pagination span.current, .line a, .wp-caption .wp-caption-text').css( 'background-color', $.xcolor.darken( newval, 1, 16 ) );
			$('.commentlist, .commentlist .comment').css( 'border-color', $.xcolor.darken( newval, 1, 13 ) );
			$('.commentlist .bypostauthor article').css( 'background-color', $.xcolor.darken( newval, 1, 7 ) );
		});
	});

	wp.customize( 'primary_color', function( value ) {
		value.bind( function( newval ) {
			$('.primary,.primary-links a,li.current_page_item > a,li.current_page_parent > a,li.current_page_ancestor > a,li.current-menu-item > a,li.current-menu-ancestor > a,li.current-menu-parent > a, .content a, .primary-scheme, .primary-scheme h1, .primary-scheme h2, .primary-scheme h3, .primary-scheme h4, .primary-scheme h5, .primary-scheme h6, .primary-scheme a, h2.comments-title, #reply-title, .trcMenuCategory .categoryName h1').css( 'color', newval );
			$( '.pagination a.page-numbers, .pagination span, .trcMenuPrev, .trcMenuNext, .primary-scheme' ).not('.current').css( 'background-color', newval );
		});
	});

	wp.customize( 'primary_text_color', function( value ) {
		value.bind( function( newval ) {
			$( '.pagination a.page-numbers, .pagination span' ).not('.current').css( 'color', newval );
		});
	});

	wp.customize( 'logo', function( value ) {
		value.bind( function( newval ) {
			if( newval !== '' ) {
				$( '#siteLogo img' ).attr( 'src', newval ).show();
				$( '#siteLogo hgroup' ).hide();
			}
			else {
				$( '#siteLogo img' ).hide();
				$( '#siteLogo hgroup' ).show();
			}
		});
	});

	wp.customize( 'layout', function( value ) {
		value.bind( function( newval ) {
			$( '#siteContent' ).removeAttr('class');
			if( newval === '1col' ) {
				$('#siteContent').attr( 'class', 'twelve columns' );
				$('#siteSidebar').hide();
			}
			else if( newval === '2col_left' ) {
				$('#siteContent').attr( 'class', 'eight columns push-four' );
				if( $( '#siteSidebar' ).length === 0 ) {
					$( '#siteContent' ).after('<div id="siteSidebar">Loading Sidebar...</div>');
					load_sidebar();
				}
				$('#siteSidebar').attr( 'class', 'four columns pull-eight' ).show();
			}
			else {
				$('#siteContent').attr( 'class', 'eight columns' );
				if( $( '#siteSidebar' ).length === 0 ) {
					$( '#siteContent' ).after('<div id="siteSidebar">Loading Sidebar...</div>');
					load_sidebar();
				}
				$('#siteSidebar').attr( 'class', 'four columns' ).show();
			}
		});
	});

	wp.customize( 'sidebar', function( value ) {
		value.bind( function( newval ) {
			load_sidebar( newval );
		});
	});


	/*********************************/
	/*      3.2  Header Options      */
	/*********************************/
	wp.customize( 'header_bar_background', function( value ) {
		value.bind( function( newval ) {
			$('#headerBar').css( 'background-color', newval );
			$('#headerBar .search input').css( 'background-color', $.xcolor.darken( newval, 1, 22 ) );
		});
	});

	wp.customize( 'header_bar_color', function( value ) {
		value.bind( function( newval ) {
			$('#headerBar, #headerBar a').css( 'color', newval );
			$('#headerBar .search input').css( 'color', newval );
		});
	});

	wp.customize( 'header_bar_quotes', function( value ) {
		value.bind( function( newval ) {
			var quotes = newval.split( "\n" );
			var elements = [];
			jQuery.each( quotes, function() {
				elements.push( '<div class="quote">' + this + '</div>' );
			});
			var quote_content = elements.join( '' );
			jQuery('#headerQuotes').html( quote_content );
		});
	});

	wp.customize( 'header_bar_quote_style', function( value ) {
		value.bind( function( newval ) {
			stopQuoteRotation( '#headerQuotes' );
			if( newval === 'cycle' ) {
				startQuoteRotation( '#headerQuotes' );
			}
		});
	});

	/*********************************/
	/*      3.3  Footer Options      */
	/*********************************/
	wp.customize( 'footer_background', function( value ) {
		value.bind( function( newval ) {
			$('#siteFooter, #siteFooter .semicircle').css( 'background-color', newval );
		});
	});

	wp.customize( 'footer_background_image', function( value ) {
		value.bind( function( newval ) {
			if( newval === '' || newval === null || typeof newval === 'undefined' ) {
				$('#siteFooter').css( 'background', $('#siteFooter').css( 'background-color' ) )
				$('#siteFooter .semicircle').css( 'background', $('#siteFooter').css( 'background-color' ) )
			}
			else {
				$('#siteFooter').css( 'background', 'url(' + newval + ') repeat top center' );
				$('#siteFooter .semicircle').css( 'background', 'url(' + newval + ') repeat bottom center' );
			}
		});
	});


	wp.customize( 'footer_border_color', function( value ) {
		value.bind( function( newval ) {
			$('#siteFooter').css( 'border-color', newval );
		});
	});


	wp.customize( 'footer_text_color', function( value ) {
		value.bind( function( newval ) {
			$('#siteFooter h1, #siteFooter h2, #siteFooter h3, #siteFooter h4, #siteFooter h5, #siteFooter h6, #siteFooter h1.widget-title').css( 'color', newval );
			$('#siteFooter, #siteFooter a').css( 'color', $.xcolor.darken( newval, 3, 26 ) );
		});
	});

	wp.customize( 'footer_quotes', function( value ) {
		value.bind( function( newval ) {
			var quotes = newval.split( "\n" );
			var elements = [];
			jQuery.each( quotes, function() {
				elements.push( '<div class="quote">' + this + '</div>' );
			});
			var quote_content = elements.join( '' );
			jQuery('#footerQuotes').html( quote_content );
		});
	});

	wp.customize( 'footer_quote_style', function( value ) {
		value.bind( function( newval ) {
			stopQuoteRotation( '#footerQuotes' );
			if( newval === 'cycle' ) {
				startQuoteRotation( '#footerQuotes' );
			}
		});
	});

	wp.customize( 'footer_bar_background', function( value ) {
		value.bind( function( newval ) {
			$('#footerBar').css( 'background-color', newval );
		});
	});

	wp.customize( 'footer_bar_color', function( value ) {
		value.bind( function( newval ) {
			$('#footerBar, #footerBar a, #footerBar h1, #footerBar h2, #footerBar h3, #footerBar h4, #footerBar h5, #footerBar h6, #footerBar ul li a').css( 'color', newval );
		});
	});

	wp.customize( 'footer_bar_text', function( value ) {
		value.bind( function( newval ) {
			$('#footerBarText').html( newval );
		});
	});



} )( jQuery );