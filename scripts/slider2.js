function handleSliderChangeTemperature(sliderType) {
    var currentSlider = $(`.${sliderType}[type="range"]`);
    var currentvalue = currentSlider.val();
    var minValue = currentSlider.prop('min');
    var maxValue = currentSlider.prop('max');
    var percent = Math.round((currentvalue - minValue) * 100 / (maxValue - minValue));
    $('h4').html(Math.round(currentvalue*100) + '<span></span>');
    $('h4').css({'filter': 'hue-rotate(' + 2*percent + 'deg)', 'transform': 'translateX(-50%)', 'left': Math.round(percent) + '%'});
}

function handleSliderChange(sliderType) {
    var currentSlider = $(`.${sliderType}[type="range"]`);
    var currentvalue = currentSlider.val();
    var minValue = currentSlider.prop('min');
    var maxValue = currentSlider.prop('max');
    var percent = Math.round((currentvalue - minValue) * 100 / (maxValue - minValue));
    $('h4').html(currentvalue + '<span></span>');
    $('h4').css({'filter': 'hue-rotate(' + 662*percent + 'deg)', 'transform': 'translateX(-50%)', 'left': Math.round(percent) + '%'});

}


////////////////////////////////////////////////////////////////////////////////////* T1 */////////////////////////////////////////////////////////////////////////
    $('.ctlT1[type="range"]').on('change input', function() {
    handleSliderChangeTemperature('ctlT1');
    });

    document.getElementById("ctlT1").addEventListener('mouseover', function() {
    handleSliderChangeTemperature('ctlT1');
    });

////////////////////////////////////////////////////////////////////////////////////* T2 */////////////////////////////////////////////////////////////////////////
    $('.ctlT2[type="range"]').on('change input', function() {
    handleSliderChangeTemperature('ctlT2');
    });

    document.getElementById("ctlT2").addEventListener('mouseover', function() {
    handleSliderChangeTemperature('ctlT2');
    });

////////////////////////////////////////////////////////////////////////////////////* T3 */////////////////////////////////////////////////////////////////////////
    $('.ctlT3[type="range"]').on('change input', function() {
    handleSliderChangeTemperature('ctlT3');
    });

    document.getElementById("ctlT3").addEventListener('mouseover', function() {
    handleSliderChangeTemperature('ctlT3');
    });

////////////////////////////////////////////////////////////////////////////////////* T4 */////////////////////////////////////////////////////////////////////////
    $('.ctlT4[type="range"]').on('change input', function() {
    handleSliderChangeTemperature('ctlT4');
    });

    document.getElementById("ctlT4").addEventListener('mouseover', function() {
    handleSliderChangeTemperature('ctlT4');
    });

////////////////////////////////////////////////////////////////////////////////////* Проводимость */////////////////////////////////////////////////////////////
    $('.ctlT5[type="range"]').on('change input', function() {
    handleSliderChange('ctlT5');
    });

    document.getElementById("ctlConductivity").addEventListener('mouseover', function() {
    handleSliderChange('ctlT5');
    });

///////////////////////////////////////////////////////////////////////////////////* Количество итераций *///////////////////////////////////////////////////////
    $('.ctlT6[type="range"]').on('change input', function() {
    handleSliderChange('ctlT6');
    });

    document.getElementById("ctlIteration").addEventListener('mouseover', function() {
    handleSliderChange('ctlT6');
    });

///////////////////////////////////////////////////////////////////////////////////* Скорость */////////////////////////////////////////////////////////////////////
    $('.ctlT7[type="range"]').on('change input', function() {
    handleSliderChange('ctlT7');
    });

    document.getElementById("ctlIteration_speed").addEventListener('mouseover', function() {
    handleSliderChange('ctlT7');
    });

///////////////////////////////////////////////////////////////////////////////////* Разрешение */////////////////////////////////////////////////////////////////////
    $('.ctlT8[type="range"]').on('change input', function() {
    handleSliderChange('ctlT8');
    });

    document.getElementById("ctlResulation").addEventListener('mouseover', function() {
    handleSliderChange('ctlT8');
    });

///////////////////////////////////////////////////////////////////////////////////* Время */////////////////////////////////////////////////////////////////////
    $('.ctlTime[type="range"]').on('change input', function() {
    handleSliderChange('ctlTime');
    });

    document.getElementById("ctlTime").addEventListener('mouseover', function() {
    handleSliderChange('ctlTime');
    });
