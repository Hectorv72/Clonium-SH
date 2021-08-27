const tblClonium = document.getElementById('tabla');

let globalAwait = false;

// const arrRows = [];
// const arrCols = [];

let arrayGame = [];
const filas = 12;
const columnas = 12;

const game = async () => {
  const response = await fetch('/board');
  const json = await response.json();
  console.log(json);
  arrayGame = json;

  // arrayGame[1][1].value = 3;
  // arrayGame[1][1].color = 'red';
  // arrayGame[1][1].player = 1;

  // arrayGame[1][columnas - 2].value = 3;
  // arrayGame[1][columnas - 2].color = 'blue';
  // arrayGame[1][columnas - 2].player = 2;

  // arrayGame[1][5].value = 3;
  // arrayGame[1][5].color = 'green';
  // arrayGame[1][5].player = 2;

  // arrayGame[1][columnas - 7].value = 3;
  // arrayGame[1][columnas - 7].color = 'green';
  // arrayGame[1][columnas - 7].player = 2;

  cargarLista();
};
game();
/* let acumulador = 1;

// const jugadores = [{ color: 'blue' }, { color: 'red' }];

// Carga la lista con elementos en 0
for (let i = 0; i < filas; i++) {
  arrCols = [];

  for (let j = 0; j < columnas; j++) {
    arrCols.push({ id: acumulador, value: 0, color: 'white', player: null });
    acumulador += 1;
  }

  arrRows.push(arrCols);
}

// crear un array nuevo con los espacios vacios
for (let i = 0; i < filas; i++) {
  arrayGame[i] = arrRows[i].slice();
} */

// Agrega un punto a las fichas de alrededores
function expandir (array, posrow, poscol) {
  const ficha = array[posrow][poscol].value;
  const color = array[posrow][poscol].color;
  // const player = array[posrow][poscol].player;

  if (ficha >= 4) {
    if (posrow > 0) { // Agrega una ficha arriba
      array[posrow - 1][poscol].value += 1;
      array[posrow - 1][poscol].color = color;
    }

    if (posrow < filas - 1) { // Agrega una ficha abajo
      array[posrow + 1][poscol].value += 1;
      array[posrow + 1][poscol].color = color;
    }

    if (poscol > 0) { // Agrega una ficha a la izq
      array[posrow][poscol - 1].value += 1;
      array[posrow][poscol - 1].color = color;
    }

    if (poscol < columnas - 1) { // Agrega una ficha a la der
      array[posrow][poscol + 1].value += 1;
      array[posrow][poscol + 1].color = color;
    }

    // si la ficha tiene 5 por el culo te la hinco, y agrega uno al medio
    if (ficha === 5) {
      array[posrow][poscol].value = 1;
    } else {
      array[posrow][poscol].value = 0;
      array[posrow][poscol].color = 'white';
    }
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
      if (array[i][j].value >= 4) {
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
  array[posrow][poscol].value += 1;
  const ficha = array[posrow][poscol].value;

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

//

//

function cargarLista () {
  let newBoard = '';

  arrayGame.forEach(row => {
    newBoard += '<tr>';
    row.forEach(column => {
      newBoard += `<td style="background-color: ${column.color}">${column.value}</td>`;
    });
    newBoard += '</tr>';
  });
  tblClonium.innerHTML = newBoard;

  // llama a la funcion que crea sus eventos click
  cellsEvents(tblClonium);
}

function cellsEvents (table) {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].addEventListener('click', () => {
        // console.log('click' + ' ' + i + ' ' + j);
        const ficha = arrayGame[i][j].value;

        if (globalAwait === false) {
          if (ficha >= 1) {
            addDot(arrayGame, i, j);
          }
        }
      });
      // console.log(table.rows[i].cells[j]);
    }
  }
}
// tblClonium.rows[0].cells[0].style = "color: red;";
