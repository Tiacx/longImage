/*
 * 拖拽
 * version: 1.0.0 - 2019.02.22
 * Requires ES6
 * Copyright (c) 2019 Tiac
 */
class TxT
{
	static init(effect)
	{
		this.effect = effect;

		$(document).mousemove(function(e) {
			if (!!this.move) {
				var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
					callback = document.call_down || function() {
						$(this.move_target).css({
							'top': e.pageY - posix.y,
							'left': e.pageX - posix.x
						});
					};

				callback.call(this, e, posix);
			}
		}).mouseup(function(e) {
			if (!!this.move) {
				var callback = document.call_up || function(){};
				callback.call(this, e);
				$.extend(this, {
					'move': false,
					'move_target': null,
					'call_down': false,
					'call_up': false
				});
			}
		});
	}

	static bind(oTxt)
	{
		var _this = this;
		var offsetW = oTxt.width()/2;
		var $box = oTxt.mousedown(function(e) {
		    var offset  = $(this).offset();
		    var pOffset = $(this).parent().offset();
		    this.posix  = {'x': e.pageX + pOffset.left - offsetW - offset.left, 'y': e.pageY + pOffset.top - offset.top};
		    $.extend(document, {'move': true, 'move_target': this});
		}).on('mousedown', '.coor', function(e) {
		    var posix = {
		            'w': $box.width(), 
		            'h': $box.height(), 
		            'x': e.pageX, 
		            'y': e.pageY
		        };
		    
		    $.extend(document, {'move': true, 'call_down': function(e) {
		        $box.css({
		            'width': Math.max(30, e.pageX - posix.x + posix.w),
		            'height': Math.max(30, e.pageY - posix.y + posix.h)
		        });
		    }});
		    return false;
		});

		oTxt.on('click', function(){
			$('.txt').removeClass('active');
			$(this).addClass('active');

			_this.effect.setStyle($(this));
		});
	}
}

export default TxT;