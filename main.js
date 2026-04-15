// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Emojis en lugar de números para hacer el juego visualmente más atractivo
const emojisCore = ['🍎', '🍌', '🍇', '🍉', '🍓', '🥑', '🥕', '🌽'];
let emojis = [...emojisCore, ...emojisCore];
let shuffledEmojis = [];

// Apuntando a elementos del documento HTML
const mostrarMovimientos = document.getElementById('movimientos');
const mostrarAciertos = document.getElementById('aciertos');
const mostrarTiempo = document.getElementById('t-restante');
const board = document.getElementById('board');
const resetBtn = document.getElementById('reset-btn');

function initGame() {
    // Resetear variables
    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = timerInicial;
    clearInterval(tiempoRegresivoId);

    // Actualizar UI
    mostrarMovimientos.innerHTML = movimientos;
    mostrarAciertos.innerHTML = aciertos;
    mostrarTiempo.innerHTML = `${timer}s`;
    mostrarAciertos.classList.remove('victory-text');
    mostrarTiempo.classList.remove('victory-text');

    // Mezclar emojis aleatoriamente
    shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

    // Generar tablero dinámicamente
    generarTablero();
}

function generarTablero() {
    board.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const btn = document.createElement('button');
        btn.classList.add('card');
        btn.id = i;
        btn.addEventListener('click', () => destapar(i));
        board.appendChild(btn);
    }
}

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `${timer}s`;
        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            mostrarTiempo.innerHTML = '¡Fin! 😢';
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<span class="emoji-reveal">${shuffledEmojis[i]}</span>`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    if (tarjetasDestapadas === 1) {
        // Mostrar primer elemento
        tarjeta1 = document.getElementById(id);
        primerResultado = shuffledEmojis[id];
        tarjeta1.innerHTML = `<span class="emoji-reveal">${primerResultado}</span>`;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        // Mostrar segundo elemento
        tarjeta2 = document.getElementById(id);
        segundoResultado = shuffledEmojis[id];
        tarjeta2.innerHTML = `<span class="emoji-reveal">${segundoResultado}</span>`;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = movimientos;

        if (primerResultado === segundoResultado) {
            // Reiniciar contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            // Marcar como aciertos visualmente
            tarjeta1.classList.add('matched');
            tarjeta2.classList.add('matched');

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = aciertos;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `${aciertos} 😱`;
                mostrarTiempo.innerHTML = `${timerInicial - timer}s 🎉`;
                mostrarAciertos.classList.add('victory-text');
                mostrarTiempo.classList.add('victory-text');
            }
        } else {
            // Mostrar error visual y luego ocultar
            tarjeta1.classList.add('wrong');
            tarjeta2.classList.add('wrong');

            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjeta1.classList.remove('wrong');
                tarjeta2.classList.remove('wrong');
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

// Event Listeners
resetBtn.addEventListener('click', initGame);

// Iniciar el juego por primera vez al cargar
initGame();
