;(function($){ $.fn.extend({

	bonsaiTiles : function(options) {
		var defaults = {
			animationSpeed: parseInt( this.attr('data-animation_speed') ),
			progressSpeed: parseInt( this.attr('data-progress_speed') ),
			animation: 'slideBottom',
			autostart: this.attr('data-autostart'),
			order: this.attr('data-order')
		};

		options = $.extend(defaults, options);

		var $collection = this;
		var tileRotation = [];

		function tile_content_center( $collection ) {
			jQuery.each( $collection.find('.tile .tile-content .inner' ), function(){
				var th = jQuery(this).parent().height();
				var tch = jQuery(this).outerHeight();
				var push = (th - tch) / 2;
				jQuery(this).css( 'top', push + 'px' );
			});
		}

		function set_isotope( $collection ) {
			var width = $collection.width() / 4;
			width = Math.floor( width );
			$collection.find( '.tile' ).width( width );
			$collection.isotope({
				resize: false,
				masonry: { columnWidth: width }
			});
		}

		function get_current_tile( tiles ) {
			var max = tiles.find( '.tile' ).length - 1;
			var current = tiles.find( '.tile.current' ).index();
			current = ( current === -1 ) ? max : current;
			return current;
		}

		function get_next_tile( tiles, current_tile, order ) {
			var max = tiles.find( '.tile' ).length - 1;
			var next = 0;
			if( order === 'desc' ) {
				next = current_tile - 1;
				next = ( next < 0 ) ? max : next;
			}
			else if( order === 'rand' ){
				next = Math.floor(Math.random() * (max - 0 + 1)) + 0;
			}
			else {
				next = current_tile + 1;
				next = ( next > max ) ? 0 : next;
			}

			return next;
		}

		function hide_tile( tiles, tile ) {
			var animationSpeed = tiles.attr('data-progressspeed');
			animationSpeed = ( typeof animationSpeed === 'undefined' ) ? options.animationSpeed : parseInt(animationSpeed, 10);

			var target_tile = tiles.find( '.tile:eq(' + tile + ')');
			target_tile.find('.tile-content' ).stop().animate( {
				top: '100%'
			}, animationSpeed );
			target_tile.removeClass('current');
		}

		function show_tile( tiles, tile ) {
			var animationSpeed = tiles.attr('data-progressspeed');
			animationSpeed = ( typeof animationSpeed === 'undefined' ) ? options.animationSpeed : parseInt(animationSpeed, 10);


			var target_tile = tiles.find( '.tile:eq(' + tile + ')');
			target_tile.find('.tile-content' ).stop().animate( {
				top: '0px'
			}, animationSpeed);
			target_tile.addClass( 'current' );
		}

		function switch_tiles( tiles, current_tile, next_tile ) {
			hide_tile( tiles, current_tile );
			if( next_tile !== null ) {
				show_tile( tiles, next_tile );
			}
		}

		function rotateTiles( tiles ) {
			var order = tiles.attr('data-order');
			order = ( typeof order === 'undefined' ) ? options.order : order;

			var current_tile = get_current_tile( tiles );
			var next_tile = get_next_tile( tiles, current_tile, order );

			switch_tiles( tiles, current_tile, next_tile );

		}


		function is_rotated( tiles ) {
			var autostart = tiles.attr('data-autostart');
			if ( typeof autostart === 'undefined' ) {
				autostart = options.autostart;
			}
			else {
				autostart = ( autostart === 'true' ) ? true : false;
			}

			return autostart;

		}

		function stop_rotation( tiles ) {
			var id = tiles.attr('data-id');
			clearInterval( tileRotation[id] );
		}

		function start_rotation( tiles ) {
			var id = tiles.attr('data-id');
			var progressSpeed = tiles.attr('data-progressspeed');
			progressSpeed = ( typeof progressSpeed === 'undefined' ) ? options.progressSpeed : parseInt(progressSpeed, 10);

			if( is_rotated( tiles ) === true ) {
				tileRotation[id] = setInterval( function() { rotateTiles( tiles ); }, progressSpeed );
			}
		}


		$collection.imagesLoaded( function() {
			set_isotope( $collection );
			tile_content_center( $collection );
		});

		jQuery(window).smartresize( function( event ) {
			set_isotope( $collection );
			tile_content_center( $collection );
		});

		this.each( function( element ) {
			var tiles = $(this);
			var id = Math.floor(Math.random() * (987612 - 2312 + 1)) + 2312;
			tiles.attr('data-id', id);

			var progressSpeed = tiles.attr('data-progressspeed');
			progressSpeed = ( typeof progressSpeed === 'undefined' ) ? options.progressSpeed : parseInt(progressSpeed, 10);


			if( is_rotated( tiles ) === true ) {
				tileRotation[id] = setInterval( function() { rotateTiles( tiles ); }, progressSpeed );
			}

		});

		$('.tile').on('mouseenter', function() {
			var tiles = $(this).parent();
			var current_tile = get_current_tile( tiles );
			switch_tiles( tiles, current_tile, $(this).index() );
		});

		$('.tile').on('mouseleave', function() {
			var tiles = $(this).parent();
			var current_tile = get_current_tile( tiles );
			switch_tiles( tiles, current_tile, null );
		});


		$('.tiles').on('mouseenter', function() {
			stop_rotation( $(this) );
		});

		$('.tiles').on('mouseleave', function() {
			start_rotation( $(this) );
		});




	}



}); })(jQuery);