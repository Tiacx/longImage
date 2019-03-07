/*
 * 图片编辑
 * version: 1.0.0 - 2019.02.28
 * Requires ES6
 * Copyright (c) 2019 Tiac
 */
class PicEffect
{
	static init()
	{
		this.addStyleEvents();
	}

	// 样式
	static addStyleEvents()
	{
		// 背景颜色
		$('.colorpicker-pic').on('changeColor', function(){
			$('.item.active').css('background-color', $(this).find('.form-control').val());
		});
	}

	// 设置样式
	static setStyle(oDiv)
	{
		let backgroundColor = oDiv.css('background-color');
		if(backgroundColor == 'rgba(0, 0, 0, 0)') backgroundColor = 'rgba(255,255,255,1)';
		$('.colorpicker-pic').colorpicker('setValue', backgroundColor);
	}
}

export default PicEffect;