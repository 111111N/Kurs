

$(function slidervalue() 

{
	$('[type="range"]').on('', function() {
	var currentvalue = ($('.[type="range"]').val());
	$('h4').html(currentvalue+'<span></span>');
	$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});


	////////////////////////////////////////////////////////////////////////////////////* T1 */////////////////////////////////////////////////////////////////////////
	$('.ctlT1[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT1[type="range"]').val()); /* Текущее значение */
		var minValue= $('.ctlT1[type="range"]').prop('min'); /* Максимально допустимое */
		var maxValue= $('.ctlT1[type="range"]').prop('max'); /* Минимально допустимое */
		percent = Math.round((currentvalue-minValue)*100/maxValue); /* Вычисление процента */
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});


	////////////////////////////////////////////////////////////////////////////////////* T1 */////////////////////////////////////////////////////////////////////////
	$('.ctlT2[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT2[type="range"]').val());
		var minValue= $('.ctlT2[type="range"]').prop('min');
		var maxValue= $('.ctlT2[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});


	////////////////////////////////////////////////////////////////////////////////////* T1 */////////////////////////////////////////////////////////////////////////
	$('.ctlT3[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT3[type="range"]').val());
		var minValue= $('.ctlT3[type="range"]').prop('min');
		var maxValue= $('.ctlT3[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});


	////////////////////////////////////////////////////////////////////////////////////* T1 *//////////////////////////////////////////////////////////////////////////
	$('.ctlT4[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT4[type="range"]').val());
		var minValue= $('.ctlT4[type="range"]').prop('min');
		var maxValue= $('.ctlT4[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});

	////////////////////////////////////////////////////////////////////////////////////* Проводимость */////////////////////////////////////////////////////////////
	$('.ctlT5[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT5[type="range"]').val());
		var minValue= $('.ctlT5[type="range"]').prop('min');
		var maxValue= $('.ctlT5[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});

	///////////////////////////////////////////////////////////////////////////////////* Количество итераций *///////////////////////////////////////////////////////
	$('.ctlT6[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT6[type="range"]').val());
		var minValue= $('.ctlT6[type="range"]').prop('min');
		var maxValue= $('.ctlT6[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});

	///////////////////////////////////////////////////////////////////////////////////* Скорость */////////////////////////////////////////////////////////////////////
	$('.ctlT7[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT7[type="range"]').val());
		var minValue= $('.ctlT7[type="range"]').prop('min');
		var maxValue= $('.ctlT7[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});

	///////////////////////////////////////////////////////////////////////////////////* Разрешение */////////////////////////////////////////////////////////////////////
	$('.ctlT8[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlT8[type="range"]').val());
		var minValue= $('.ctlT8[type="range"]').prop('min');
		var maxValue= $('.ctlT8[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});

	///////////////////////////////////////////////////////////////////////////////////* Время */////////////////////////////////////////////////////////////////////
	$('.ctlTime[type="range"]').on('change input', function() {
		var currentvalue = ($('.ctlTime[type="range"]').val());
		var minValue= $('.ctlTime[type="range"]').prop('min');
		var maxValue= $('.ctlTime[type="range"]').prop('max');
		percent = Math.round( (currentvalue-minValue)*100/(maxValue-minValue));;
		$('h4').html(currentvalue+'<span></span>');
		$(' h4').css('filter', 'hue-rotate(' + percent + 'deg)');
		// $('h4').css({'transform': 'translateX(calc(-50% - 20px)) scale(' + (1+(currentvalue/100)) + ')', 'left': currentvalue+'%'});
		$('h4').css({'transform': 'translateX(-50%) scale(' + (1) + ')', 'left': Math.round(percent)+'%'});
	});
});