// let globalAwait = false;

// let {globalAwait} = require('/javascript/global.js');
import { verifExpansion, expandir } from '/javascript/process.js';
let globalAwait = false;
export { setGlobalAwait, cargarLista };

function setGlobalAwait (bolean) {
  globalAwait = bolean;
}

const tblClonium = document.getElementById('tabla');

let arrayGame = [];
let filas;
let columnas;

const game = async () => {
  const response = await fetch('/board');
  const json = await response.json();
  console.log(json);
  arrayGame = json.board;
  filas = json.rows;
  columnas = json.cols;

  cargarLista(arrayGame);
};

// Funcion que agrega un punto a la ficha
function addDot (array, posrow, poscol) {
  globalAwait = true;
  array[posrow][poscol].value += 1;
  const ficha = array[posrow][poscol].value;

  if (ficha >= 4) {
    // expandir(array, posrow, poscol);
    // verifExpansion(array);
    setTimeout(() => { verifExpansion(array, filas, columnas); }, 500);
  } else {
    globalAwait = false;
  }
  cargarLista(array);

  // console.log(array);
  // console.log(" ");
};

// addDot(arrayGame,1,1);

//

//

function cargarLista (array) {
  let newBoard = '';

  array.forEach(row => {
    newBoard += '<tr>';
    row.forEach(column => {
      let valor = column.value;
      if (column.value === 0) { valor = ''; }
      newBoard += `<td><div style="background-color: ${column.color};" >${valor}</div></td>`;
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

game();
