/*
 * 文字编辑
 * version: 1.0.0 - 2019.02.27
 * Requires ES6
 * Copyright (c) 2019 Tiac
 */
class TxtEffect
{
	static init()
	{
		this.addPostionEvents();
		this.addStyleEvents();
	}

	// 布局
	static addPostionEvents()
	{
		$('.txt-position .btn').on('click', function(){
			let o = $('.txt-position .btn.active');
			$('.txt.active').removeClass(o.attr('data-position')).addClass($(this).attr('data-position'));
			o.removeClass('active');
			$(this).addClass('active');

			if ($(this).attr('data-position')=='p-out-top') {
				$('.item.active .pic-wrapper').before( $('.txt.active') );
			} else {
				$('.item.active .pic-wrapper').after( $('.txt.active') );
			}
		});
	}

	// 样式
	static addStyleEvents()
	{
		// 字体
		$('.font-family').on('change', function(){
			$('.txt.active').css('font-family', $(this).val());
		});

		// 颜色
		$('.colorpicker-txt').on('changeColor', function(){
			$('.txt.active').css('color', $(this).find('.form-control').val());
		});

		// 加粗
		$('.btn-txt-bold').on('click', function(){
			$(this).toggleClass('active');
			$('.txt.active').toggleClass('bold');
		});

		// 加大
		$('.btn-txt-plus').on('click', function(){
			let fs = parseInt( $('.txt.active').css('font-size') );
			$('.txt.active').css('font-size', (++fs)+'px');
		});

		// 减小
		$('.btn-txt-minus').on('click', function(){
			let fs = parseInt( $('.txt.active').css('font-size') );
			$('.txt.active').css('font-size', (--fs)+'px');
		});
	}

	static setStyle(oTxt)
	{
		let postion,fontFamily,color,isBold;
		
		$('.txt-position .btn.active').removeClass('active');
		try{
			postion = oTxt.attr('class').match(/p-[^\s]+/)[0];
			$('.txt-position .btn[data-position="'+ postion +'"]').addClass('active');
		}catch(e){
			$('.txt-position .btn:eq(0)').addClass('active');
		}
		
		fontFamily = oTxt.css('font-family');
		if(fontFamily.indexOf(',') > -1) fontFamily = 'Helvetica';
		fontFamily = fontFamily.replace(/"/g, '');
		color = oTxt.css('color');
		if(color == 'rgba(0, 0, 0, 0)') color = 'rgba(0,0,0,1)';
		isBold = oTxt.hasClass('bold');

		$('.font-family').val(fontFamily).trigger('change');
		$('.colorpicker-txt').colorpicker('setValue', color);
		if(isBold == true){
			$('.btn-txt-bold').addClass('active');
		}else{
			$('.btn-txt-bold').removeClass('active');
		}
	}
}

export default TxtEffect;