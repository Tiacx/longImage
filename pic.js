/*
 * 图片绽放及水平平移
 * version: 1.0.0 - 2019.02.20
 * Requires ES6
 * Copyright (c) 2019 Tiac
 */
class PiC
{
	static init()
	{
		this.currentImg  = null;
		this.canvasWidth = $('.canvas').width() - 2;

		$('body').append(`
			<div class="image-control" style="display:none">
				<div class="item-control">
					<label class="label-control">缩放：</label>
					<input type="range" class="custom-range resize-range" min="0" max="100" value="100">
					<span class="percent">100%</span>
				</div>
				<div class="item-control">
					<label class="label-control">平移：</label>
					<input type="range" class="custom-range offset-range" min="0" max="100" value="50">
					<span class="percent">50%</span>
				</div>
			</div>
		`);

		this.addResizeEventListenter();
		this.addOffsetEventListenter();
	}

	// 绑定对象
	static bind(oEle)
	{
		this.currentImg = oEle.find('.pic');

		if (this.currentImg.attr('data-resize') == undefined )
		{
			this.currentImg.attr('data-resize', 100);
		}

		if (this.currentImg.attr('data-offset') == undefined )
		{
			this.currentImg.attr('data-offset', 50);
		}

		oEle.hover(()=>{
			this.currentImg = oEle.find('.pic');
			oEle.append($('.image-control'));
			$('.image-control').show();
			$('.image-control .resize-range').val( this.currentImg.attr('data-resize') ).next('.percent').html( this.currentImg.attr('data-resize') + '%' );
			$('.image-control .offset-range').val( this.currentImg.attr('data-offset') ).next('.percent').html( this.currentImg.attr('data-offset') + '%' );
		}, ()=>{
			$('.image-control').hide();
		});
	}

	// 缩放
	static addResizeEventListenter()
	{
		let _this = this;
		$('.image-control .resize-range').on('input', function(){
			// 百分比
			let r = $(this).val();
			// 图片缩放
			let w = r/100 * _this.canvasWidth;
			_this.currentImg.width(w).attr('data-resize', r);

			$(this).next('.percent').html(r + '%');

			$('.image-control .offset-range').trigger('input');
		});
	}

	// 平移
	static addOffsetEventListenter()
	{
		let _this = this;
		$('.image-control .offset-range').on('input', function(){
			// 百分比
			let r  = $(this).val();
			// 图片的当前大小
			let w  = _this.currentImg.width();
			// 极限范围
			let ll = -w; // 左边极限
			let lr = _this.canvasWidth; // 右边极限

			// 偏移量 = 左边极限 + 滚动范围*当前百分比
			let l  = ll + (lr-ll) * (r/100);
			_this.currentImg.css('margin-left', l + 'px').attr('data-offset', r);

			$(this).next('.percent').html(r + '%');
		});
	}
}

export default PiC;