const tblClonium = document.getElementById('tabla');

let globalAwait = false;

const arrRows = [];
let arrCols = [];

const arrayGame = [];
const filas = 5;
const columnas = 5;

// Carga la lista con elementos en 0
for (let i = 0; i < filas; i++) {
  arrCols = [];

  for (let j = 0; j < columnas; j++) {
    arrCols.push(0);
  }

  arrRows.push(arrCols);
}

// crear un array nuevo con los espacios vacios
for (let i = 0; i < filas; i++) {
  arrayGame[i] = arrRows[i].slice();
}

// Agrega un punto a las fichas de alrededores
function expandir (array, posrow, poscol) {
  const ficha = array[posrow][poscol];

  if (ficha >= 4) {
    if (posrow > 0) { array[posrow - 1][poscol] += 1; } // Agrega una ficha arriba
    if (posrow < filas) { array[posrow + 1][poscol] += 1; } // Agrega una ficha abajo
    if (poscol > 0) { array[posrow][poscol - 1] += 1; } // Agrega una ficha a la izq
    if (poscol < columnas) { array[posrow][poscol + 1] += 1; } // Agrega una ficha a la der

    // si la ficha tiene 5 por el culo te la hinco, y agrega uno al medio
    if (ficha === 5) { array[posrow][poscol] = 1; } else { array[posrow][poscol] = 0; }
  }

  // actualiza la tabla html de fichas (board)
  cargarLista();
}

// Verifica la posicion de las fichas que tienen mas de 3 y los expande (se retroalimenta)
function verifExpansion (array) {
  const list = [];

  // Recorre el array en busca de fichas con mas de 3
  // Y las guarda en una nueva lista
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (array[i][j] >= 4) {
        list.push([i, j]);
      }
    }
  }

  // Si la lista es mayor de 0 elementos entonces los expande y luego vuelve a verificar
  if (list.length > 0) {
    globalAwait = true;
    // console.log(list);
    list.forEach(element => expandir(array, element[0], element[1]));
    setTimeout(() => { verifExpansion(array); }, 2000);
  } else {
    globalAwait = false;
  }

  console.log(array);
}

// Funcion que agrega un punto a la ficha
const addDot = (array, posrow, poscol) => {
  array[posrow][poscol] += 1;
  const ficha = array[posrow][poscol];

  if (ficha >= 4) {
    expandir(array, posrow, poscol);
    verifExpansion(array);
  } else {
    cargarLista();
  }

  // console.log(array);
  // console.log(" ");
};

// addDot(arrayGame,1,1);

arrayGame[1][1] = 3;
arrayGame[0][1] = 3;
arrayGame[1][0] = 3;
arrayGame[0][2] = 3;

function cargarLista () {
  let newBoard = '';

  arrayGame.forEach(row => {
    newBoard += '<tr>';
    row.forEach(column => {
      newBoard += `<td>${column}</td>`;
    });
    newBoard += '</tr>';
  });
  tblClonium.innerHTML = newBoard;

  // llama a la funcion que crea sus eventos click
  cellsEvents(tblClonium);
}

cargarLista();

function cellsEvents (table) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].addEventListener('click', () => {
        console.log('click' + ' ' + i + ' ' + j);

        if (globalAwait === false) {
          addDot(arrayGame, i, j);
        }
      });
      // console.log(table.rows[i].cells[j]);
    }
  }
}
// tblClonium.rows[0].cells[0].style = "color: red;";
