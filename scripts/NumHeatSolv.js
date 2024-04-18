/*Автор https://github.com/diwsi/2D-Heat-Equation-Solver*/

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
            if (time >= u.length) {
                return
            };
            ctx.beginPath();

            Log("Итераций : " + time + "/" + u.length);
            let uT = u[time];
            for (let x = 0; x < uT.length - 1; x++) {
                for (let y = 0; y < uT[x].length - 1; y++) {
                    var density = Math.floor(255 * uT[x + 1][y + 1]);
                    ctx.fillStyle = 'rgb(' + density + ', ' + 0 + ', ' + 10 + ')';
                    ctx.fillRect(x * config.resulation, y * config.resulation, config.resulation, config.resulation);
                }
            }
            ctx.stroke();
            if (config.autoPlay) {
                autoPlayTimeOut = setTimeout(() => {
                    DrawSolution(time + Math.round(config.iteration_speed));
                }, 50);
            }
            button_clear.onclick = function DrawSolution(){
            time=0;
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
            Log("<span class='loader'></span>")
            setTimeout(() => {
                BuildConfig();
                initSolution();
                Resolve();
                DrawSolution(0);

            });

        }

        function Log(log) {
            info.innerHTML = log;
        }

        function initUI() {
            info = document.getElementById('ctlInfo');
            //Config controller events
            var controls = document.querySelectorAll(".controls input");
            for (let i = 0; i < controls.length; i++) {
                controls[i].addEventListener("change", InitProblem);
            }
        }

        initUI();
        InitProblem();

        