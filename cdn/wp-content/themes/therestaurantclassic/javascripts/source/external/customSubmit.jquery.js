;(function($){
	$.fn.extend({
		customSubmit : function(options) {
			if(typeof document.body.style.maxHeight != "undefined"){
				var defaults = {
					customClass: 'button submit'
				};
				options = $.extend(defaults, options);

				return this.each(function() {
					var $this = $(this);
					var value = $this.val();
					var classes = $this.attr('class');
					var replace = $('<div class="' + classes + ' ' + options.customClass + '">' + value + '</div>');
					$this.replaceWith( replace );
				});
			}
		}
	});
})(jQuery);
