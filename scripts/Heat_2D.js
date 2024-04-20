// m: Двумерное уравнение теплопроводности
// Версия 1.4-mini от 06.10.2014

window.addEventListener("load", main_heat, false);

var newfps=document.getElementById('fraps');
var newspf=document.getElementById('steps');
var newT_mouse_max=document.getElementById('T_mmx');
var newT_mouse_min=document.getElementById('T_mmn');
var newx=document.getElementById(xi)
var isFunctionRunning = false;

function main_heat() {
    if(isFunctionRunning==true){
        return
    }
    // Предварительные установки
    isFunctionRunning = true;

    var canv = init_canvas(Heat_2D_canvas);

    var a0 = 1;                             // масштаб расстояния
    var t0 = 1;                             // масштаб времени
    var m0 = 1;                             // масштаб массы
    var T0 = 1;                             // масштаб температуры

    var dx = 1 * a0;                        // шаг сетки по оси x

    var spf = 1;                            // steps per frame - сколько расчетов проходит за каждый кадр отображения
    var fps = 10;
    var dt = 0.005 * t0;                    // шаг интегрирования по времени

    var p0 = m0 / (a0 * a0 * a0);           // единица плотности, кг/м3
    var c0 = a0 * a0 / (t0 * t0 * T0);      // единица удельной теплоемкости, Дж/(кг * К)    (Дж = кг * м2 / с2)
    var kap0 = m0 * a0 / (t0 * t0 * t0 * T0);// единица теплопроводности (?, каппа)

    var p = 0.15 * p0;
    var c = 0.2 * c0;
    var k = 1 * kap0;
    var X = k / (c * p);                    // температуропроводность (?, хи)

    var Nx = 50 + 2;                        // количество узлов по оси x + 2 для ГУ
    var Ny = 50 + 2;

    var cell_w = canv.w / (Nx - 2);         // ширина клетки
    var cell_h = canv.h / (Ny - 2);         // высота клетки

    // Минимальная и максимальная температуры используются для подбора цветовой гаммы
    var T_min = 0 * T0;
    var T_max = 10 * T0;

    var T_mouse_max = 9;                    // температура для левой клавиши мыши
    var T_mouse_min = 1;                                 // температура для правой клавиши мыши

    var color_N = 1000;                       // цветов не больше, чем color_N, саму переменную color_N в расчетах лучше не использовать
    var colors = prepare_colors(color_N);
    var cell_pics = prepare_cell_pics(colors);

    var pause = false;
    button_pause.onclick = function () {pause = !pause;};
    button_clear.onclick = function () {
        for (var i = 0; i < Nx; i++) {
            for (var j = 0; j < Ny; j++) {
                T[i][j].u = (T_max - T_min) / 2;
                T[i][j].v = 0;
            }
        }
        draw_graph();
    };

    var T = [];
    for (var i = 0; i < Nx; i++) {
        T[i] = [];
        for (var j = 0; j < Ny; j++) {
            T[i][j] = {};
            var x = i / (Nx - 1);
            var y = j / (Ny - 1);

            var width = 0.05;
            var power = 5;
            var plus = 5;

            T[i][j].u = Math.exp(-Math.pow(x - 0.5, 2) / width) * Math.exp(-Math.pow(y - 0.5, 2) / width) * power + plus;
            T[i][j].v = 0;
        }
    }

    // периодические граничные условия
    for (i = 1; i < Nx - 1; i++) {
        T[i][0] = T[i][Ny - 2];
        T[i][Ny - 1] = T[i][1];
    }
    for (j = 0; j < Ny; j++) {
        T[0][j] = T[Nx - 2][j];
        T[Nx - 1][j] = T[1][j];
    }

    function prepare_cell_pics(col) {
        var pics = [];
        for (var i = 0; i < col.length; i++) {
            var cell = document.createElement('canvas');
            var cell_ctx = cell.getContext('2d');

            cell_ctx.fillStyle = col[i];
            cell_ctx.beginPath();
            cell_ctx.rect(0, 0, cell_w, cell_h);
            cell_ctx.fill();
            pics.push(cell);
        }
        return pics;
    }


    function control() {
        if (!pause) {
            calculate_steps(spf, dt);
            draw_graph();
        }
    }

    setInterval(control, 1000 / fps);                       // Запуск системы


    // Работа с мышью

    Heat_2D_canvas.onmousedown = function(e){               // функция при нажатии клавиши мыши
        var T1;
        if (e.which == 1) T1 = T_mouse_max;                 // при нажатии левой клавиши мыши клетка нагревается
        else if (e.which == 2) T1 = (T_max - T_min) / 2;    // при нажатии средней клавиши мыши клетка получает среднюю температуру
        else if (e.which == 3) T1 = T_mouse_min;            // при нажатии правой клавиши мыши клетка остывает
        else return;

        set_cell(e, T1);
        Heat_2D_canvas.onmousemove = function(e) {set_cell(e, T1);};   // функция, выполняющаяся при перемещении курсора мыши
        return false;
    };

    document.onmouseup = function(e){                   // функция при отпускании клавиши мыши
        Heat_2D_canvas.onmousemove = null;              // когда клавиша отпущена - функции перемещения нету
    };

    function set_cell(e, T1){                           // придать клетке определенное состояние с нажатия клавиши мыши
        var m = mouse_coords(e);                        // обновить координаты в переменных mouseX, mouseY
        if (m.x < 0 || m.x >= canv.w || m.y < 0 || m.y >= canv.h) return;         // проверка на ошибочные координаты
        // везде прибавляем 1 - из за периодических условий массив сдвинут на 1
        var i = Math.floor(m.x / cell_w) + 1;           // получаем ячейку по горизонтали
        var j = Math.floor(m.y / cell_h) + 1;           // получаем ячейку по вертикали
        T[i][j].u = T1;
        draw_cell(i, j);
    }

    function mouse_coords(e) {                          // функция возвращает экранные координаты курсора мыши
        var m = [];
        var rect = Heat_2D_canvas.getBoundingClientRect();
        m.x = e.clientX - rect.left;
        m.y = e.clientY - rect.top;
        return m;
    }

    function calculate_steps(spf, dt) {
        var koeff1 = X / (dx * dx)     * dt;
        for (var s = 0; s < spf; s++) {
            for (var i = 1; i < Nx - 1; i++) {
                for (var j = 1; j < Ny - 1; j++) {
                    T[i][j].v = (T[i + 1][j].u + T[i][j + 1].u - 4 * T[i][j].u + T[i - 1][j].u + T[i][j - 1].u) * koeff1;
                }
            }

            for (var i = 1; i < Nx - 1; i++) {
                for (var j = 1; j < Ny - 1; j++) {
                    T[i][j].u += T[i][j].v;
                }
            }
        }
    }


    function draw_graph() {
        // график
        canv.ctx.clearRect(0, 0, canv.w, canv.h);
        for (var i = 1; i <= Nx - 1; i++) {
            for (var j = 1; j <= Ny - 1; j++) {
                var col = Math.round((T[i][j].u - T_min) * (colors.length - 1) / (T_max - T_min));            // 0 <= col <= color_N
                if (col < 0) col = 0;
                if (col >  (colors.length - 1)) col =  (colors.length - 1);
                canv.ctx.drawImage(cell_pics[col], (i - 1) * cell_w, (j - 1) * cell_h);
            }
        }
    }

    function draw_cell(i, j) {
        var col = Math.round((T[i][j].u - T_min) * (colors.length - 1) / (T_max - T_min));            // 0 < col < color_N
        canv.ctx.drawImage(cell_pics[col], (i - 1) * cell_w, (j - 1) * cell_h);
    }
    function RGBtoHEX(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function prepare_colors(N) {
        var col = [];
        var n = N / 6 - 1;
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(255 - i, 255, 255));
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(0, 255 - i, 255));
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(0, 0, 255 - i));
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(i, 0, 0));
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(255, i, 0));
        for (var i = 0; i < 256; i += Math.floor(255 / n))
            col.push(RGBtoHEX(255, 255, i));
        return col;
    }

    function init_canvas(canvas) {
        canvas.onselectstart = function () {return false;};     // запрет выделения canvas
        canvas.oncontextmenu = function () {return false;};      // блокировка контекстного меню

        var canv_obj = {};
        canv_obj.ctx = canvas.getContext("2d");                  // на context происходит рисование
        canv_obj.w = canvas.width;          // ширина окна в расчетных координатах
        canv_obj.h = canvas.height;         // высота окна в расчетных координатах

        return canv_obj;
    }
    document.getElementById('sendbutton').onclick = function(){
    if(newfps.value-newfps.value==0){
    fps=Math.round(newfps.value);
    setInterval(control, 1000 / fps);
    }
        
    if(newspf.value-newspf.value==0){
    spf=Math.round(newspf.value);
    }
    if(newT_mouse_max.value-newT_mouse_max.value==0){
    T_mouse_max=Math.round(newT_mouse_max.value);}

    if(newT_mouse_min.value-newT_mouse_min.value==0){
    T_mouse_min=Math.round(newT_mouse_min.value);
    }}
}


// Авторы оригинального кода: Цветков Денис и Антон Кривцов
// Доработал: Наддака Артём
// http://tm.spbstu.ru/Цветков_Денис_Валерьевич, http://tm.spbstu.ru/Антон_Кривцов, http://tm.spbstu.ru/Двумерное_уравнение_теплопроводности