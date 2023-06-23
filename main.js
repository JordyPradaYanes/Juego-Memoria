// Inicialización de variables

let targetasDestapadas = 0;
let targeta1 = null;
let targeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Apuntando a elementos del documento HTML

let mostrarMovimientos = document.getElementById('movimientos');
let mostarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante'); 

// Generación de números aleatorios

let num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

num = num.sort(() => { return Math.random() - 0.5 });

// Funciones

function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTargetas();
    }
  }, 1000);
}

function bloquearTargetas() {
  for (let i = 0; i <= 15; i++) {
    let targetaBloqueada = document.getElementById(i);
    targetaBloqueada.innerHTML = num[i];
    targetaBloqueada.disabled = true;
  }
}

// Función principal
function destapar(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  targetasDestapadas++;
  if (targetasDestapadas === 1) {
    // Mostrar primer número
    targeta1 = document.getElementById(id);
    primerResultado = num[id];
    targeta1.innerHTML = primerResultado;

    // Deshabilitar el primer botón
    targeta1.disabled = true;
  } else if (targetasDestapadas === 2) {
    // Mostrar segundo número
    targeta2 = document.getElementById(id);
    segundoResultado = num[id];
    targeta2.innerHTML = segundoResultado;

    // Deshabilitar segundo botón
    targeta2.disabled = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado === segundoResultado) {
      // Reiniciar contador de tarjetas destapadas
      targetasDestapadas = 0;

      // Aumentar aciertos
      aciertos++;
      mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos === 8) {
        clearInterval(tiempoRegresivoId);
        mostarAciertos.innerHTML = `Aciertos ${aciertos} 😱`;
        mostrarTiempo.innerHTML = `Fantástico 🎉 solo demoraste ${timerInicial - timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤘😎`;
      }
    } else {
      // Mostrar momentáneamente valores y volver a tapar
      setTimeout(() => {
        targeta1.innerHTML = '';
        targeta2.innerHTML = '';
        targeta1.disabled = false;
        targeta2.disabled = false;
        targetasDestapadas = 0;
      }, 800);
    }
  }
}
