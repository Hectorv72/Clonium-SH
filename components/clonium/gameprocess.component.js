let localArray = [];
let arrayProcess = [];

// Verifica la posicion de las chips que tienen mas de 3 y los expandChipe (se retroalimenta)
function checkChipExpansion (array) {
  const list = [];
  const rows = array.length;
  const cols = array[0].length;

  // Recorre el array en busca de chips con mas de 3
  // Y las guarda en una nueva lista
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (array[i][j].value >= 4) {
        list.push([i, j]);
      }
    }
  }

  // Si la lista es mayor de 0 elementos entonces los expandChipe y luego vuelve a verificar
  if (list.length > 0) {
    list.forEach(element => expandChip(array, element[0], element[1], rows, cols));
    arrayProcess.push(JSON.parse(JSON.stringify(array)));
    checkChipExpansion(array);
  }
}

// Agrega un punto a las fichas de alrededores
function expandChip (array, posrow, poscol, rows, cols) {
  const chip = array[posrow][poscol];
  const color = array[posrow][poscol].color;
  const player = array[posrow][poscol].player;

  if (chip.value >= 4) {
    if (posrow > 0) { // Agrega un punto/ficha arriba
      array[posrow - 1][poscol].value += 1;
      array[posrow - 1][poscol].color = color;
      array[posrow - 1][poscol].player = player;
    }

    if (posrow < rows - 1) { // Agrega un punto/ficha abajo
      array[posrow + 1][poscol].value += 1;
      array[posrow + 1][poscol].color = color;
      array[posrow + 1][poscol].player = player;
    }

    if (poscol > 0) { // Agrega un punto/ficha a la izquierda
      array[posrow][poscol - 1].value += 1;
      array[posrow][poscol - 1].color = color;
      array[posrow][poscol - 1].player = player;
    }

    if (poscol < cols - 1) { // Agrega un punto/ficha a la derecha
      array[posrow][poscol + 1].value += 1;
      array[posrow][poscol + 1].color = color;
      array[posrow][poscol + 1].player = player;
    }

    // si la chip tiene 5 por el culo te la hinco, y agrega uno al medio
    if (chip.value === 5) {
      array[posrow][poscol].value = 1;
    } else {
      array[posrow][poscol].value = 0;
      array[posrow][poscol].color = '';
      array[posrow][poscol].player = null;
    }
  }
}

function addDot (array, posrow, poscol) {
  //
  //   globalAwait = true;
  array[posrow][poscol].value += 1;
  const chip = array[posrow][poscol];

  if (chip.value >= 4) {
    checkChipExpansion(array);
  } else {
    arrayProcess.push(JSON.parse(JSON.stringify(array)));
  }
};

// Funcion de agregar punto y devolver array nuevo
function chipSelect (array, row, col) {
  localArray = [];
  arrayProcess = [];

  // console.log(localArray);
  // console.log('-------------');

  // console.log(arrayProcess);
  // console.log('------------------------------------');
  localArray = array;

  arrayProcess.push(JSON.parse(JSON.stringify(localArray)));
  addDot(localArray, row, col);
  // console.log(JSON.parse(JSON.stringify(arrayProcess)));
  // arrayProcess.forEach(element => console.log(element));
  return { board: localArray, process: arrayProcess };
}

module.exports = { chipSelect };
