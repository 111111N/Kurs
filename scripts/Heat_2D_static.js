window.addEventListener("load", main_heat, false);
function main_heat() {

    // Предварительные установки

    var canv = init_canvas(Heat_2D_canvas);

    var a0 = 1;                             // масштаб расстояния
    var t0 = 1;                             // масштаб времени
    var m0 = 1;                             // масштаб массы
    var T0 = 1;                             // масштаб температуры

    var dx = 1 * a0;                        // шаг сетки по оси x

    var spf = 1;                            // steps per frame - сколько расчетов проходит за каждый кадр отображения
    var fps = 69;
    var dt = 0.005 * t0;                    // шаг интегрирования по времени

    var p0 = m0 / (a0 * a0 * a0);           // единица плотности, кг/м3
    var c0 = a0 * a0 / (t0 * t0 * T0);      // единица удельной теплоемкости, Дж/(кг * К), Дж = кг * м2 / с2, => м^2/с^2*К
    var kap0 = m0 * a0 / (t0 * t0 * t0 * T0);// единица теплопроводности (каппа), ВТ/см*К, Вт=Дж/c, => кг * м/ с^3*К

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
    var T_mouse_min = 1;                    // температура для правой клавиши мыши

    var color_N = 60;                       // цветов не больше, чем color_N, саму переменную color_N в расчетах лучше не использовать
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
}

// Авторы: Цветков Денис и Антон Кривцов
// http://tm.spbstu.ru/Цветков_Денис_Валерьевич, http://tm.spbstu.ru/Антон_Кривцов