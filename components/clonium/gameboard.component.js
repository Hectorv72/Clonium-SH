const { colPositions, rowPositions } = require('./positions');

// Crea la mesa de juego vacia con el largo y el ancho
const setBoard = (width, height) => {
  const rows = [];

  for (let row = 0; row < width; row++) {
    const cols = [];

    for (let col = 0; col < height; col++) {
      const itemID = (col + 1) + (height * row);
      cols.push({ id: itemID, row: row, col: col, value: 0, player: null, color: '' });
    }

    rows.push(cols);
  }

  return rows;
};

// => Crea la lista de jugadores (Temporal)
const setPlayers = (players) => {
  const list = [];
  const colors = ['red', 'blue', 'green', 'violet', 'yellow', 'cyan', 'blue', 'gray', 'red'];

  for (let i = 0; i < players; i++) {
    list.push({ id: i + 1, turno: i + 1, color: colors[i] });
  }

  return list;
};

// => Proceso de creacion dinamica de posiciones de jugadores (Temporal)
const boardProcess = (width, height, board, players) => {
  const w = (width - 2);
  const h = (height - 2);

  // La mitad de los jugadores
  const halfplayers = Math.round(players.length / 2);

  // Cantidad de celdas de espacio entre las fichas
  const cellspace = Math.round(((w) / (halfplayers - 1)));
  const rowspace = Math.round(((h) / (halfplayers - (halfplayers / 2))));

  // crea las listas de posiciones
  const positions = [];
  const colpositions = colPositions(w, halfplayers, cellspace);
  const rowpositions = rowPositions(h, rowspace);

  // Agrega a la lista las posiciones
  for (let pos = 0; pos < players.length; pos++) {
    if (pos >= halfplayers) {
      if (pos === players.length - 1) {
        positions.push([rowpositions[1], colpositions[colpositions.length - 1]]);
      } else {
        positions.push([rowpositions[1], colpositions[pos - halfplayers]]);
      }
    } else {
      positions.push([rowpositions[0], colpositions[pos]]);
    }
  }

  // Coloca las fichas de cada jugador en la posición correspondiente
  for (let i = 0; i < players.length; i++) {
    const position = positions[i];
    board[position[0]][position[1]].value = 3;
    board[position[0]][position[1]].player = players[i].id;
    board[position[0]][position[1]].color = players[i].color;
  }

  return board;
};

// Crea las posiciones de las fichas en la mesa de juego
const setGame = (width, height, board, players) => {
  if (players.length <= 4) {
    let positions;

    if (players.length === 2) {
      positions = [[1, 1], [width - 2, height - 2]]; // [width - 2, height - 2]
    } else {
      positions = [[1, 1], [1, height - 2], [width - 2, 1], [width - 2, height - 2]];
    }

    // Coloca las fichas de cada jugador en la posición correspondiente
    for (let i = 0; i < players.length; i++) {
      const position = positions[i];

      board[position[0]][position[1]].value = 3;
      board[position[0]][position[1]].player = players[i].id;
      board[position[0]][position[1]].color = players[i].color;
    }
  } else {
    board = boardProcess(width, height, board, players);
  }

  return board;
};

module.exports = { setGame, setBoard, setPlayers };
