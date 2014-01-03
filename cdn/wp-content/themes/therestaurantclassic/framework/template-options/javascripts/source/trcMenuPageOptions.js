;( function( $, window, document, undefined ) {

	var defaults = {
	};

	function trcMenuManager( element, options ) {

		element.config = $.extend( {}, defaults, options );
		element.sortables = element.find( 'ul' );
		element.pages = element.find( '.menuPage' );
		element.structure = element.find( '#_trc_menu' );
		element.removeItem = element.find( '.removeItem' );
		element.removePage = element.find( '.removePage' );
		element.addPage = element.find( '.addPage' );
		element.addItem = element.find( '.addItem' );
	}


	$.fn.trcMenuManager = function( options ) {

		new trcMenuManager( this, options );
		var element = this;

        function get_structure() {
			var structure = [];
			$.each( $('#trcMenuManager').find( '.menuPage' ), function( i ) {
				structure[i] = [];
				structure[i].left = [];
				structure[i].right = [];
				$.each( $( this ).find( '.menuLeft li' ), function(){
					structure[i].left.push( $(this).attr('data-id') );
				});
				$.each( $( this ).find( '.menuRight li' ), function(){
					structure[i].right.push( $(this).attr('data-id') );
				});
			});
			return structure;
        }

        function update_structure() {
			var structure = get_structure();
			$('#_trc_menu').val( serialize( structure ) );
        }

		function update_pagination() {
			$.each( $('.menuPage'), function( i ) {
				$(this).find('h1 .num').html( i + 1);
				$(this).find('.addItem').attr( 'data-page', i + 1 );
				$(this).attr( 'data-page', i + 1 );
			});
		}

        function create_sortables( element ) {

			element.sortable({
				connectWith: ".menuPage ul",
				forcePlaceholderSize: true,
				placeholder: "placeholder",
				tolerance: 'intersect',
				update: function() {
					update_structure();
				}
			});
			element.disableSelection();

        }

		function updateMenuManager() {
			update_pagination();
			update_structure();
		}

		function position_items() {
			$( '#MenuManagerItems' ).prependTo( 'body' );
		}

        position_items();
        create_sortables( element.sortables );

        element.removePage.on( 'click', function() {
			if( $('.menuPage').length == 1 ){
				$(this).parents('.menuPage:first').find('ul').html('');
			}
			else {
				$(this).parents('.menuPage:first').remove();
			}
			updateMenuManager();
			return false;
        });


		element.addPage.live( 'click', function() {
			var page = $( '.menuPage:first' ).clone();
			page.find('ul').html( '' );
			page.insertAfter( '.menuPage:last' );
			create_sortables( page.find( 'ul' ) );
			updateMenuManager();
			return false;
		});

		element.removeItem.live( 'click', function() {
			$(this).parent( 'li:first' ).remove();
			updateMenuManager();
			return false;
		});


		element.addItem.live( 'click', function() {
			$('#MenuManagerItems').reveal();
			$('#MenuManagerItems').attr( 'data-page', $(this).attr('data-page') );
			$('#MenuManagerItems').attr( 'data-side', $(this).attr('data-side') );
			return false;
		});

		$( '#MenuManagerItems li' ).live( 'click', function() {
			var element = $(this).clone();
			var page = $('#MenuManagerItems').attr('data-page');
			var side = $('#MenuManagerItems').attr('data-side');
			var target = $('.menuPage[data-page="' + page + '"]').find( '.' + side + ' ul' );
			element.appendTo( target );
			$('#MenuManagerItems').trigger('reveal:close');
			updateMenuManager();
		});


	};

})( jQuery, window, document );

function serialize (mixed_value) {
  // http://kevin.vanzonneveld.net
  // +   original by: Arpad Ray (mailto:arpad@php.net)
  // +   improved by: Dino
  // +   bugfixed by: Andrej Pavlovic
  // +   bugfixed by: Garagoth
  // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
  // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
  // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
  // +      input by: Martin (http://www.erlenwiese.de/)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   improved by: Le Torbi (http://www.letorbi.de/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net/)
  // +   bugfixed by: Ben (http://benblume.co.uk/)
  // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
  // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
  // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
  var val, key, okey,
    ktype = '', vals = '', count = 0,
    _utf8Size = function (str) {
      var size = 0,
        i = 0,
        l = str.length,
        code = '';
      for (i = 0; i < l; i++) {
        code = str.charCodeAt(i);
        if (code < 0x0080) {
          size += 1;
        }
        else if (code < 0x0800) {
          size += 2;
        }
        else {
          size += 3;
        }
      }
      return size;
    },
    _getType = function (inp) {
      var match, key, cons, types, type = typeof inp;

      if (type === 'object' && !inp) {
        return 'null';
      }
      if (type === 'object') {
        if (!inp.constructor) {
          return 'object';
        }
        cons = inp.constructor.toString();
        match = cons.match(/(\w+)\(/);
        if (match) {
          cons = match[1].toLowerCase();
        }
        types = ['boolean', 'number', 'string', 'array'];
        for (key in types) {
          if (cons == types[key]) {
            type = types[key];
            break;
          }
        }
      }
      return type;
    },
    type = _getType(mixed_value)
  ;

  switch (type) {
    case 'function':
      val = '';
      break;
    case 'boolean':
      val = 'b:' + (mixed_value ? '1' : '0');
      break;
    case 'number':
      val = (Math.round(mixed_value) == mixed_value ? 'i' : 'd') + ':' + mixed_value;
      break;
    case 'string':
      val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
      break;
    case 'array': case 'object':
      val = 'a';

      for (key in mixed_value) {
        if (mixed_value.hasOwnProperty(key)) {
          ktype = _getType(mixed_value[key]);
          if (ktype === 'function') {
            continue;
          }

          okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
          vals += this.serialize(okey) + this.serialize(mixed_value[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    case 'undefined':
      // Fall-through
      break;
    default:
      // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
      val = 'N';
      break;
  }
  if (type !== 'object' && type !== 'array') {
    val += ';';
  }
  return val;
}
