function handleSliderChangeTemperature(sliderType) {
    var currentSlider = $(`.${sliderType}[type="range"]`);
    var currentvalue = currentSlider.val();
    var minValue = currentSlider.prop('min');
    var maxValue = currentSlider.prop('max');
    var percent = Math.round((currentvalue - minValue) * 100 / (maxValue - minValue));
    const hex = Math.round(percent / 100 * 255).toString(16);
    const hexret = Math.round(255- (percent / 100 * 255)).toString(16);
    $('h4').html(Math.round(currentvalue*100) + '<span></span>');
    $('h4').css({ 'transform': 'translateX(-50%)', 'left': Math.round(percent) + '%' });
    $('#h4-container.TempContainer #h4-subcontainer h4 span ').css({ 'background': 'linear-gradient(-230deg, #'
        +(hex.padStart(2, '0'))+''+Math.round(9-percent/11)+'9'+ (hexret.padStart(2, '0')) 
        + ' 30%, #'+ (hexret.padStart(2, '0')) +''+Math.round(9-percent/11)+'f' +(hexret.padStart(2, '0'))+ ' 100%'
        ,'filter' : 'drop-shadow(2.1rem 2.1rem '+(27+Math.round(10-percent/20))+'px hsl('+(230+1.2*percent)+' 66% 55%))'
        })
}

function handleSliderChange(sliderType) {
    var currentSlider = $(`.${sliderType}[type="range"]`);
    var currentvalue = currentSlider.val();
    var minValue = currentSlider.prop('min');
    var maxValue = currentSlider.prop('max');
    var percent = Math.round((currentvalue - minValue) * 100 / (maxValue - minValue));
    const hex = Math.round(0.2*(percent / 100 * 255)).toString(16);
    const hexret = Math.round(1*(255- (percent / 100 * 255))).toString(16);
    $('h4').html(currentvalue + '<span></span>');
    $('h4').css({ 'transform': 'translateX(-50%)', 'left': Math.round(percent) + '%' });
    $('#h4-container.OtherContainer #h4-subcontainer h4 span ').css(
        { 'background': 'linear-gradient(-230deg, #'
        +(hexret.padStart(2, '0'))+''+Math.round(9-percent/11)+'9'+ (hex.padStart(2, '0')) 
        + ' 30%, #'+ (hex.padStart(2, '0')) +''+Math.round(9-percent/11)+'f' +(hex.padStart(2, '0'))+ ' 75%, #593842 100%'
        ,'filter' : 'drop-shadow(2.1rem 2.1rem '+(29+Math.round(10-percent/20))+'px hsl('+(130+1.6*percent)+' 32% 25%)'
        })
}

function handleSliderChangeTime(sliderType) {
    var currentSlider = $(`.${sliderType}[type="range"]`);
    var currentvalue = currentSlider.val();
    var minValue = currentSlider.prop('min');
    var maxValue = currentSlider.prop('max');
    var percent = Math.round((currentvalue - minValue) * 100 / (maxValue - minValue));
    const hex = Math.round(0.2*(percent / 100 * 255)).toString(16);
    const hexret = Math.round(0.1*(255- (percent / 100 * 255))).toString(16);
    $('h4').html(currentvalue + '<span></span>');
    $('h4').css({ 'transform': 'translateX(-50%)', 'left': Math.round(percent) + '%' });
    $('#h4-container.TimeContainer #h4-subcontainer h4 span ').css(
        { 'background': 'linear-gradient(-230deg, #000' + ' 10%, #'+ (hex.padStart(2, '0')) +'0000 75%, #593842 100%'
        ,'filter' : 'drop-shadow(2.1rem 2.1rem '+(29+Math.round(10-percent/20))+'px hsl('+(130+1.6*percent)+' 32% 25%)'
        })
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
    handleSliderChangeTime('ctlTime');
    });

    document.getElementById("ctlTime").addEventListener('mouseover', function() {
    handleSliderChangeTime('ctlTime');
    });


