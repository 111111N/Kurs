/*Автор https://github.com/diwsi/2D-Heat-Equation-Solver*/
   
const changethemefunc  = document.querySelector('.themetext');
const btns = document.querySelectorAll('.theme'); 

changethemefunc.addEventListener('click', rr => {
    if (rr.target.classList.contains('theme')){

 btns.forEach(theme => {
    if(theme.getAttribute('id') === rr.target.getAttribute('id'))
      theme.classList.add('activebutton');
    else
      theme.classList.remove('activebutton');
    });

 DrawSolution((timeSlider = document.getElementById('ctlTime')).value);
    }
});


canvas = document.getElementById("board");
        ctx = canvas.getContext("2d");
        var autoPlayTimeOut;
        var info;
        var iteration_speed
        var config = {
        }

        //Solution Data 
        var u;

        //generate u data
        function initSolution() {
            let segment = Math.floor(canvas.width / config.resulation) + 2;
            u = [];//time,x,y
            for (let t = 0; t < config.iterations; t++) {
                u.push([]);
                for (let x = 0; x < segment; x++) {
                    u[t].push([]);
                    for (let y = 0; y < segment; y++) {
                        //Boundaries of plane
                        if (x == 0) {//left
                            u[t][x][y] = config.T1;
                        } else if (x == segment - 1) {//Right
                            u[t][x][y] = config.T3;
                        } else if (y == 0) {//Up
                            u[t][x][y] = config.T2;
                        } else if (y == segment - 1) {//Down
                            u[t][x][y] = config.T4;
                        } else {//inner cold space
                            u[t][x][y] = 0;
                        }
                    }
                }
            }
        }

        //Draw Canvas
        function DrawSolution(time) {
            if (time > u.length)     {
                return
            };
            ctx.beginPath();

            Log("Итераций : " + time + "/" + u.length);
            let uT = u[time];
            for (let x = 0; x < uT.length - 1; x++) {
                for (let y = 0; y < uT[x].length - 1; y++) {                                        /////////////////////////////////////////* Цвет фона *////////////////////////////////////////////// 
                    var density = Math.floor(255 * uT[x + 1][y + 1]);
                   if (btns[0].classList.contains('activebutton')) {
                  ctx.fillStyle = 'rgb(' + density + ', ' + 0 + ', ' + 10 + ')';                /////////////////////////////////////////* Стандарт*//////////////////////////////////////////////
                  } else if (btns[1].classList.contains('activebutton')) {
                  ctx.fillStyle = 'lab(' + density + ' ' + 0 + ' ' + 0 + '%)';               ////////////////////////////////////////////* ЧБ */////////////////////////////////////////////////
                  } else if (btns[2].classList.contains('activebutton')) {
                   ctx.fillStyle = 'hsl(' + density + ', ' + 100 + '%, ' + 60 + '%)';    /////////////////////////////////////////* Радужный *//////////////////////////////////////////
                  }

                    ctx.fillRect(x * config.resulation, y * config.resulation, config.resulation, config.resulation);
                }
            }
            ctx.stroke();
            if (config.autoPlay) {
                autoPlayTimeOut = setTimeout(() => {
                    DrawSolution(time + Math.round(config.iteration_speed));

                }, 50);

            }
            
        }

        //Calculate each time frame
        function Resolve() {

            for (let t = 0; t < u.length - 1; t++) {
                for (let x = 1; x < u[t].length - 1; x++) {
                    for (let y = 1; y < u[t][x].length - 1; y++) {
                        u[t + 1][x][y] = config.conductivity * (u[t][x + 1][y] + u[t][x - 1][y] + u[t][x][y + 1] + u[t][x][y - 1] - 4 * u[t][x][y]) + u[t][x][y]
                    }
                }
            } 

            config.autoPlay = true;
        }

        function BuildConfig() {

            clearTimeout(autoPlayTimeOut);
            config = {
                iterations: document.getElementById('ctlIteration').value,
                resulation: 50 - document.getElementById('ctlResulation').value,
                conductivity: document.getElementById('ctlConductivity').value,
                iteration_speed: document.getElementById('ctlIteration_speed').value,
                autoPlay: false,
            }



            for (let i = 1; i < 5; i++) {
                config["T" + i] = parseFloat(document.getElementById('ctlT' + i).value);
                document.getElementById("T" + i + "C").innerHTML = "T" + i + ": " + Math.floor(100 * config["T" + i]) + " C";
            }
            let timeSlider = document.getElementById('ctlTime');
            timeSlider.max = config.iterations;
            timeSlider.value = 0;
        }

        function InitProblem() {
            Log("<span class='loader'></span> Загрузка...");
            setTimeout(() =>{
                BuildConfig();
                initSolution();
                Resolve();
                DrawSolution(0);

            },3000);

        }

        function Log(log) {
            info.innerHTML = log;
        }

        function initUI() {
            info = document.getElementById('ctlInfo');
            //Config controller events
            var controls = document.querySelectorAll(".controls input");
        }
        

        initUI();
        InitProblem();

       button_clear.addEventListener("click", function() {
         // Очищаем таймер автоматического воспроизведения
         clearTimeout(autoPlayTimeOut);
        InitProblem();
});

         button_restart.addEventListener("click", function() {
          // Показываем лоудер для приличия,
         Log("<span class='loader'></span>Загрузка...");
          // Очищаем таймер автоматического воспроизведения
        clearTimeout(autoPlayTimeOut);
        // Устанавливаем небольшую задержку перед началом длительных операций
        setTimeout(() => {
        // Обнуляем время и запускаем заново с теми же значениями
        let timeSlider = document.getElementById('ctlTime');
        timeSlider.value = 0;
        initSolution();
        Resolve();
        DrawSolution(0);
    },);// Задержка в 100 миллисекунд
});
        
