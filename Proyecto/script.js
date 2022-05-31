// Variables de html
const inputNumber = document.getElementById("inputNumbers");
const inputPeriodos = document.getElementById("inputPeriodos");
const Inputponderaciones = document.getElementById("inputPonderaciones");
const inputAlfa = document.getElementById("inputAlfa");
const inputArranque = document.getElementById("inputArranque");
//////////////
function calcularPorcentaje(ArrayPrincipal, ArrayPush, ArrayPromedio) {
  for (let i = 0; i < ArrayPrincipal.length; i++) {
    ArrayPush.push(
      redondear(
        Math.abs((ArrayPromedio[i] - ArrayPrincipal[i]) / ArrayPrincipal[i])
      )
    );
  }
}
function escribirEnHTML(id, texto) {
  document.getElementById(`${id}`).innerHTML = `${texto}`;
}
function redondear(num) {
  var rounded = Math.round((num + Number.EPSILON) * 10000) / 10000;
  return rounded;
}

function promedio(list) {
  let sumaArray = list.reduce((acumulativo, nuevo) => acumulativo + nuevo);
  let promedio = redondear(sumaArray / list.length);
  return promedio;
}

function convertirTexto_Array(list) {
  let numbersList = list.split(`,`);
  let numbersArray = numbersList.map((number) => number - "");
  return numbersArray;
}

////////////////////////////////////////

function calculatePronostic() {
  //Calculadora de promedio Simple//
  let numbers = inputNumber.value;
  let numbersArray = convertirTexto_Array(numbers);
  let promedioSimple = promedio(numbersArray);
  // document.getElementById(
  //   "answer-simple"
  // ).innerHTML = `El promedio simple para los numeros es de <b>${promedioSimple}</b>`;
  escribirEnHTML(
    "answer-simple",
    `El promedio simple para los numeros es de <b>${promedioSimple}</b>`
  );
  //Fin de calculadora de promedio simple//

  //Calculadora de promedio movil//
  let periodos = Number(inputPeriodos.value);
  let NumerosDeMovilSimple = numbersArray.splice(
    (0, numbersArray.length - periodos)
  );
  if (periodos === 0) {
    escribirEnHTML(
      "answer-movil",
      `Debe introducir periodos para calcular el promedio movil simple`
    );
  } else {
    let promedioMovil = promedio(NumerosDeMovilSimple);
    escribirEnHTML(
      "answer-movil",
      `El promedio movil para los numeros, con periodos de ${periodos} es de <b>${promedioMovil}</b>`
    );
  }
  //Fin de calculadora de promedio movil//

  //Calculadora de promedio Ponderado//
  numbersArray = convertirTexto_Array(numbers);
  const numerosponderadosArray = [];
  let ponderacionesText = Inputponderaciones.value;
  let ponderacionesArray = convertirTexto_Array(ponderacionesText);
  let numerosUsadosEnLaPonderacion = numbersArray.splice(
    (0, numbersArray.length - ponderacionesArray.length)
  );
  for (let i = 0; i < ponderacionesArray.length; i++) {
    numerosponderadosArray.push(
      ponderacionesArray[i] * numerosUsadosEnLaPonderacion[i]
    );
  }
  let promedioPonderado = numerosponderadosArray.reduce(
    (acumulativo, nuevo) => acumulativo + nuevo
  );
  escribirEnHTML(
    "answer-ponderate",
    `El promedio movil ponderado para los numeros, con ponderaciones de ${ponderacionesArray} es de <b>${promedioPonderado}</b>`
  );
  //Fin calculadora promedio ponderado//

  //Calculadora de suaviazado exponencial
  numbersArray = convertirTexto_Array(numbers);
  let alfa = Number(inputAlfa.value);
  let alfaRestante = 1 - alfa;
  let arranque = Number(inputArranque.value);
  let promediosSuavizadosArray = [];
  if (arranque == 0) {
    promediosSuavizadosArray.push(numbersArray[0]);
  } else {
    promediosSuavizadosArray.push(arranque);
  }
  for (let i = 0; i < numbersArray.length; i++) {
    promediosSuavizadosArray.push(
      redondear(
        alfa * numbersArray[i] + alfaRestante * promediosSuavizadosArray[i]
      )
    );
  }
  console.log(promediosSuavizadosArray);
  let promediosSuavizado = promediosSuavizadosArray.pop();
  escribirEnHTML(
    "answer-suavizado",
    `El promedio segun el suavizado exponencial con alfa ${alfa} es de <b>${promediosSuavizado}</b>`
  );
  //Fin Calculadora de suaviazado exponencial
}

////                                                                                                                                                    ///////////

function calculatePercentaje() {
  //Porcentaje de promedio Simple
  let numbers = inputNumber.value;
  let numbersArray = convertirTexto_Array(numbers);
  let promedioSimpleDeCadaElemento = [];
  let porcentajesPromedioSimpleArray = [];
  console.log("Numeros de datos introducidos", numbersArray.length);
  for (let i = 0; i < numbersArray.length; i++) {
    let rangoElementos = numbersArray.splice(0, i + 1);
    numbersArray = convertirTexto_Array(numbers);
    promedioSimpleDeCadaElemento.push(promedio(rangoElementos));
  }
  promedioSimpleDeCadaElemento.splice(
    promedioSimpleDeCadaElemento.length - 1,
    1
  );
  numbersArray.splice(0, 1);
  calcularPorcentaje(
    numbersArray,
    porcentajesPromedioSimpleArray,
    promedioSimpleDeCadaElemento
  );
  let porcentajePromedioSimple = promedio(porcentajesPromedioSimpleArray);
  escribirEnHTML(
    "porcentaje-simple",
    `El porcentaje de error del metodo de promedio simple es de <b>${
      porcentajePromedioSimple * 100
    }%</b>`
  );

  console.group("Datos del Promedio Simple");
  console.log(
    "Porcentajes de error por cada elemento",
    porcentajesPromedioSimpleArray
  );
  console.log(
    "Promedios pronosticados para cada elemento",
    promedioSimpleDeCadaElemento
  );
  console.groupEnd();
  ///////////////////////////////////////////////////////////////////
  //Porcentaje de promedio movil
  let promedioMovilDeCadaElemento = [];
  let porcentajePromedioMovilArray = [];
  numbersArray = convertirTexto_Array(numbers);
  let periodos = Number(inputPeriodos.value);
  if (periodos === 0) {
    escribirEnHTML(
      "porcentaje-movil",
      "No ha puesto periodos para calcular el porcentaje del promedio movil"
    );
  } else {
    for (let i = periodos; i < numbersArray.length; i++) {
      let rangoElementos = numbersArray.splice(i - periodos, periodos);
      numbersArray = convertirTexto_Array(numbers);
      promedioMovilDeCadaElemento.push(promedio(rangoElementos));
    }
    numbersArray.splice(0, periodos);
    calcularPorcentaje(
      numbersArray,
      porcentajePromedioMovilArray,
      promedioMovilDeCadaElemento
    );
    let porcentajePromedioMovil = promedio(porcentajePromedioMovilArray) * 100;
    escribirEnHTML(
      "porcentaje-movil",
      `El porcentaje de error del metodo de promedio movil es de <b>${porcentajePromedioMovil}%</b>`
    );
  }
  console.group("Datos del Promedio Movil Simple");
  console.log(
    "Promedios moviles para cada elemento",
    promedioMovilDeCadaElemento
  );
  console.log(
    "Porcentajes de error para cada elemento",
    porcentajePromedioMovilArray
  );
  console.groupEnd();
  //////////////////////////////////////////////////////////////////////
  // Porcentaje de Promedio Ponderado
  let promedioPonderadoDeCadaElemento = [];
  let porcentajePromedioPonderadoArray = [];
  numbersArray = convertirTexto_Array(numbers);
  let ponderacionesText = Inputponderaciones.value;
  let ponderacionesArray = convertirTexto_Array(ponderacionesText);
  for (let i = ponderacionesArray.length; i < numbersArray.length; i++) {
    let numeroAMultiplicar1 = numbersArray[i - ponderacionesArray.length];
    let numeroAMultiplicar2 = numbersArray[i - ponderacionesArray.length + 1];
    let numeroAMultiplicar3 = numbersArray[i - ponderacionesArray.length + 2];
    let promedio =
      numeroAMultiplicar1 * ponderacionesArray[0] +
      numeroAMultiplicar2 * ponderacionesArray[1] +
      numeroAMultiplicar3 * ponderacionesArray[2];
    promedioPonderadoDeCadaElemento.push(promedio);
  }
  numbersArray.splice(0, ponderacionesArray.length);
  calcularPorcentaje(
    numbersArray,
    porcentajePromedioPonderadoArray,
    promedioPonderadoDeCadaElemento
  );
  let promedioPorcentajePonderado = promedio(porcentajePromedioPonderadoArray);
  escribirEnHTML(
    "porcentaje-ponderate",
    `El porcentaje de error promedio para el metodo de Promedio Movil Ponderado es de <b>${
      promedioPorcentajePonderado * 100
    }%</b>`
  );
  console.group("Datos del promedio Movil Ponderado");
  console.log(
    "Porcentajes de error por cada elemento",
    porcentajePromedioPonderadoArray
  );
  console.log(
    "Promedio ponderados para cada elemento",
    promedioPonderadoDeCadaElemento
  );
  console.groupEnd();
  /////////////////////////////////////////////////
  numbersArray = convertirTexto_Array(numbers);
  let alfa = Number(inputAlfa.value);
  let alfaRestante = 1 - alfa;
  let arranque = Number(inputArranque.value);
  let promediosSuavizadosArray = [];
  let porcentajeSuavizado = [];
  if (arranque == 0) {
    promediosSuavizadosArray.push(numbersArray[0]);
  } else {
    promediosSuavizadosArray.push(arranque);
  }
  for (let i = 0; i < numbersArray.length; i++) {
    promediosSuavizadosArray.push(
      redondear(
        alfa * numbersArray[i] + alfaRestante * promediosSuavizadosArray[i]
      )
    );
  }
  calcularPorcentaje(
    numbersArray,
    porcentajeSuavizado,
    promediosSuavizadosArray
  );
  porcentajeSuavizado.shift();
  let porcentajeErrorSuavizado = promedio(porcentajeSuavizado);
  escribirEnHTML(
    "porcentaje-suavizado",
    `El porcentaje de error del metodo suavizado exponencial es de <b>${
      porcentajeErrorSuavizado * 100
    }%</b>`
  );

  console.group("Datos del Suavizado Exponencial");
  console.log(
    "Porcentajes de error de Suavizado Exponencial",
    porcentajeSuavizado
  );
  console.log("Promedios de suavizado exponencial", promediosSuavizadosArray);
  console.groupEnd;
}
