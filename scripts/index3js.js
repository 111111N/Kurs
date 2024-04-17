/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/* 1D генератор сделанный Michael Bromley */
/* https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/ */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 1;
    var scale = 1;

    var r = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        r.push(Math.random());
    }

    var getVal = function( x ){
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using &#038;
        var xMin = xFloor % MAX_VERTICES_MASK;
        var xMax = ( xMin + 1 ) % MAX_VERTICES_MASK;

        var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        return y * amplitude;	
    };

    /**
    * Функция линейной интерполяции.
    * @param a Меньшее целое значение
    * @param b Большее целое значение
    * @param t Значение между двух
    * @returns {номер}
    */
    var lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    //API
    return {
        getVal: getVal,
        setAmplitude: function(newAmplitude) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale) {
            scale = newScale;
        }
    };
};

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/* Стрелка, сделанная Titus'ом Cieslewski */
/* https://stackoverflow.com/a/6333775 */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const arrow = (context, fromx, fromy, tox, toy) => {
    var headlen = 10;   //Длина заголовка в пикселях
    var angle = Math.atan2(toy-fromy,tox-fromx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    context.moveTo(tox, toy);
    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
}

//Получение размера окна
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

//	Настройка размера холста
const canvas = document.querySelector("#canvas");
canvas.width = width/1.5;
canvas.height = 300;
const ctx = canvas.getContext('2d');

//Константы

//Постоянная величина, которая ускоряет поток тепла
const alpha = 1;
//Количество точек
const point_number = 300
//Как далеко каждая точка находится друг от друга
const dx = 1;
//Размер временных шагов
const dt = 0.01;

//Массив, содержащий значения теплоты
var values = [];

//Преобразуем значение в координату Y на холсте
const scale = (y) => (canvas.height / 2) - y;


//Отобразите значения на холсте
const draw = () => {
    ctx.lineWidth = 2;
    ctx.font = "30px Ubuntu";
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //Рисуем оси
    ctx.beginPath();
    //Y
    arrow(ctx, 7, canvas.height - 7, 7, 7)
    //X
    arrow(ctx, 7, canvas.height - 7, canvas.width - 7, canvas.height - 7)
    ctx.stroke();

    //Называем оси
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.fillText("Температура",16,30)
    ctx.fillText("Позиция",canvas.width - 135, canvas.height - 20)
    ctx.fill()

    //Рисуем значения температуры
    ctx.strokeStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(0,scale(values[0]));
    for(var i = 1; i < values.length; i++){
        ctx.lineTo(i * canvas.width / values.length, scale(values[i]));
    }
    ctx.stroke();
}


//Вычисляем новые значения
const compute = (dt) => {
    //Массив, хранящий новые значения
    var new_values = [];
    //Для каждого значения
    for(var i = 0; i < values.length; i++){
        //Следим за тем, чтобы граничные условия были соблюдены
        if(i == 0){
            new_values.push(values[i] + dt * alpha * ((values[1] - values[i]))/ dx)
        }else if(i == values.length - 1) {
            new_values.push(values[i] + dt * alpha * ((values[i-1] - values[i]))/ dx)
        //Создаем температурные потоки
        }else{
            new_values.push(values[i] + dt * alpha * ((values[i+1] + values[i-1] - 2 * values[i]))/ dx * dx);
        }        
    }
    //Заменяем старые значения новыми
    values = new_values;
}

//Функции задающие значения

//Синусоида
const sine = () => {
    values = []; 
    for(var i = 0; i < point_number; i++){
        values.push(Math.sin( i * Math.PI * 8 / point_number) * (canvas.height / 2)) 
    }
}

//Тангенс
const tan = () => {
    values = []; 
    for(var i = 0; i < point_number; i++){
        	 values.push(Math.tan( i * Math.PI * 8 / point_number) * (canvas.height / 64) )
    }
    draw(ctx.fillStyle)="black"
}


//Контакт между двумя объектами разной температуры
const square = () => {
    values = []; 
    for(var i = 0; i < point_number; i++){
        (i < point_number / 2) ? values.push(canvas.height/3) : values.push(-canvas.height/3) 
    }
};

//Случайные значения, основанный на симплексном генераторе
const random = () => {
    var generator = new Simple1DNoise();
    var x = Math.random() * 1000;
    values = []; 
    for(var i = 0; i < point_number; i++){
        values.push(generator.getVal((x + i)/15) * canvas.height - canvas.height / 2)
    }
}

//Инициализация значений с помощью функции рандома
random();

//Вычисление каждого кадра
setInterval(() => {
    draw();
    var iterations = document.querySelector("#speed").value
    for(var i = 0; i < iterations; i ++){
        compute(dt);
    }
}, 1000/60) // Фреймрейт

//Клики
document.querySelector("#sine").onclick = sine;
document.querySelector("#tan").onclick = tan;
document.querySelector("#square").onclick = square;
document.querySelector("#noise").onclick = random;
