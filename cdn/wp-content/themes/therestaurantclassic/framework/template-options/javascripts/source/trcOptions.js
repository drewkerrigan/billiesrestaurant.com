;(function ($, window, undefined) {
	var $page_template = $('#page_template');
	var post_id = $( '#post_ID' ).val();
	var $options_container = $( '#trcPostOptions' );

	$page_template.on( 'change', function(){
		addLoader();
		$.ajax({
			url: ajaxurl,
			type: 'post',
			dataType: 'json',
			data: {
				action: 'show_post_options',
				post_ID: post_id,
				template: $page_template.val(),
			},
			success: function( response ) {
				if( response.type === 'success' ) {
					$options_container.find( '.inside' ).html( response.options );
					$options_container.find( 'h3.hndle span' ).html( response.args.title );
					$('#trcPostOptions').show();
					$( '#MenuManagerItems' ).prependTo( 'body' );
					$( '#MashupManagerItems' ).prependTo( 'body' );
				}
				if( response.type === 'nooptions' ) {
					$('#trcPostOptions').hide();
				}
				removeLoader();
			}
		});
	})

	$( '#trcMenu li' ).live( 'click', function() {
		var index = $(this).index();

		switchToGroup( index );
	})


	$('.checkAll').live( 'click', function() {
		$(this).parents( '.option:first' ).find( 'input[type="checkbox"]' ).attr( 'checked', 'checked' )
	})

	$('.checkNone').live( 'click', function() {
		$(this).parents( '.option:first' ).find( 'input[type="checkbox"]' ).removeAttr( 'checked' )
	})


	function switchToGroup( index ) {
		$( '#trcMenu li' ).removeClass('active');
		$( '#trcOptions section' ).removeClass('active');

		$( '#trcMenu li' ).eq(index).addClass('active');
		$( '#trcOptions section' ).eq(index).addClass('active');
	}


	function addLoader() {
		$('#trcLoad').fadeIn( 400 );
	}

	function removeLoader() {
		$('#trcLoad').fadeOut( 400 );
	}


	jQuery('#trcMenuManager').trcMenuManager();
	jQuery('#trcMashupManager').trcMashupManager();


})(jQuery, this);