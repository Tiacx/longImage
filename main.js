import PiC from './pic.js';
import PicEffect from './pic.effect.js';
import TxT from './txt.js';
import TxtEffect from './txt.effect.js';

class Main
{
	constructor()
	{
		// code
	}

	init()
	{
		this.initSelect2();
		this.initColorPicker();
		this.initCanvasEvents();
		this.initImageEvents();
		this.initTxtEvents();

		PiC.init(PicEffect);
		TxT.init(TxtEffect);
		PicEffect.init();
		TxtEffect.init();
	}

	initSelect2()
	{
		$('.font-family').select2({
			theme: 'bootstrap',
			templateResult: formatState,
			templateSelection: formatState
		});
	}

	initCanvasEvents()
	{
		// 初始化高度
		$('.canvas').attr('data-height', $('.canvas').height());

		// 放大
		$('.btn-zoom-in').on('click', function(){
			canvasScale(1);
		});

		// 缩小
		$('.btn-zoom-out').on('click', function(){
			canvasScale(2);
		});
	}

	initImageEvents()
	{
		// 添加一张图片
		$('.btn-add-image').on('click', function(){
			$('#file').trigger('click');
		});
		$('#file').on('change', function(){
			let oDiv = $('<div class="item"><i class="fas fa-list drag-handle"></i><div class="pic-wrapper"><i class="fas fa-times-circle btn-remove" title="移除"></i><img class="pic" src="https://iph.href.lu/10x10" draggable="false"></div></div>');
			$('.canvas').append(oDiv);
			preView($('#file').get(0), function(src){
				oDiv.find('img').attr('src', src);
				if(window.oSortable != undefined) window.oSortable.destroy();
				window.oSortable = new Sortable($('.canvas').get(0), {
					handle: '.drag-handle'
				});

			    oDiv.on('mouseenter', function(event){
			    	$(this).siblings('.item').removeClass('active');
			    	$(this).addClass('active');
			    	$('.panel-pic').removeClass('disabled');

			    	PicEffect.setStyle($(this));

			    	event.stopPropagation();
			    	return false;
			    });

			    oDiv.find('.pic-wrapper .btn-remove').on('click', function(){
			    	$(this).parent().parent().remove();
			    });

			    PiC.bind(oDiv.find('.pic-wrapper'));
			});
		});

		// 上传图片
		$('.btn-upload-image').on('click', ()=>{
			this.uploadImage();
		});
		// 下载图片
		$('.btn-download-image').on('click', ()=>{
			this.downloadImage();
		});
	}

	initTxtEvents()
	{
		$('.btn-add-txt').on('click', function(){
			let oActivePic = $('.item.active');
			if(oActivePic.length == 0){
				mToast('请先选择一张图片~');
				return false;
			}

			$('.txt').removeClass('active');
			let oTxt = $(`<div class="txt active" contentEditable="true" style="width:100px">文字<div class="coor" contentEditable="false" title="缩放"></div><i class="fas fa-times-circle btn-remove" contentEditable="false" title="移除"></i></div>`);
			oActivePic.append(oTxt);
			TxT.bind(oTxt);

		    oTxt.find('.btn-remove').on('click', function(){
		    	$(this).parent().remove();
		    });

			$('.panel-txt').removeClass('disabled');
		});
	}

	initColorPicker()
	{
		$('.colorpicker-component').colorpicker();
	}

	// 上传图片
	uploadImage()
	{
		$('.canvas').css('height', 'auto');
		$('.canvas').css('transform', 'scale(1)');
		$('.drag-handle').hide();
		$('.item.active').removeClass('active');
		$('.txt.active').removeClass('active');

		let itemLength = $('.canvas .item').length;
		let itemIndex  = 0;
		$('.canvas .item').each(function(){
			html2canvas($(this).get(0)).then(canvas => {

				$.post('./upload.php', {'data':canvas.toDataURL()}, function(res){
					itemIndex++;
					if(res.error==0){
						if(itemIndex == itemLength){
							mToast('保存成功');
					        $('.canvas').css('height', '100%');
							$('.drag-handle').show();
						}
					}else{
						mToast(res.message);
					}
				}, 'json');
			});
		});
	}

	// 下载图片
	downloadImage()
	{
		$('.canvas').css('height', 'auto');
		$('.drag-handle').hide();
		$('.item.active').removeClass('active');
		$('.txt.active').removeClass('active');
		html2canvas($('.canvas').get(0)).then(canvas => {
	        $('.canvas').css('height', '100%');
			$('.drag-handle').show();

		    // canvas宽度
	        var canvasWidth = canvas.width;
	        // canvas高度
	        var canvasHeight = canvas.height;

	        // 下载
	        Canvas2Image.saveAsImage(canvas, canvasWidth, canvasHeight, 'jpg', 'QWQ');
		});
	}
}

$(document).ready(function() {
	window.oM = new Main();
	oM.init();
});

/******************************************华丽的分割线***********************************************/

// select2 格式化
function formatState(state){
	if (!state.id) {
		return state.text;
	}
	return $(`<span style="font-family:'${state.element.value}'">${state.text}</span>`);
}

// 提示
function mToast(msg){
	$('.toast .toast-body').html(msg);
	$('.toast').toast('show');
}

// 缩放画布
function canvasScale(type){
	let transform = $('.canvas').css('transform');
	if(transform.indexOf('matrix')==-1) transform = 'matrix(1, 0, 0, 1, 0, 0)';
	let scale = parseFloat( transform.match(/matrix\(([^,]+)/)[1] );

	if(type==1 && scale<1) scale += 0.1;
	if(type==2 && scale>0.3) scale -= 0.1;

	$('.canvas').css('transform', `matrix(${scale}, 0, 0, ${scale}, 0, 0)`);

	let height = parseFloat($('.canvas').attr('data-height'));
	$('.canvas').height( height/scale );
}

/******************************************华丽的分割线***********************************************/

// 图片预览
function preView(_this, _cb){
    let reader        = new FileReader();
    reader.onload     = function(e) {
        _cb( e.target.result );
    }
    reader.readAsDataURL(_this.files[0]);
}