const { colPositions, rowPositions } = require('./positions');

const setBoard = (width, height) => {
  const rows = [];

  for (let row = 0; row < width; row++) {
    const cols = [];

    for (let col = 0; col < height; col++) {
      const itemID = (col + 1) + (height * row);
      cols.push({ id: itemID, value: 0, player: null, color: '' });
    }

    rows.push(cols);
  }

  return rows;
};

// //=>

//

const setPlayers = (players) => {
  const list = [];
  const colors = ['red', 'blue', 'green', 'violet', 'yellow', 'cyan', 'blue', 'gray', 'golden'];

  for (let i = 0; i < players; i++) {
    list.push({ id: i + 1, turno: i + 1, color: colors[i] });
  }

  return list;
};

// //=>

//

const boardProcess = (width, height, board, players) => {
  const w = (width - 2);
  const h = (height - 2);

  // La mitad de los jugadores
  const halfplayers = Math.round(players.length / 2);

  // Cantidad de celdas de espacio entre las fichas
  const cellspace = Math.round(((w) / (halfplayers - 1)));
  const rowspace = Math.round(((h) / (halfplayers - (halfplayers / 2))));

  console.log(rowspace);

  // si los espacios de filas es mayor que el height pequeño lo reduce
  // if (rowspace >= h) {
  //   rowspace -= 1;
  // }

  console.log(rowspace);

  // creal la lsta de posiciones
  const positions = [];
  const colpositions = colPositions(w, halfplayers, cellspace);
  const rowpositions = rowPositions(h, rowspace);

  console.log(colpositions);
  console.log(rowpositions);

  for (let pos = 0; pos < players.length; pos++) {
    if (pos >= halfplayers) {
      if (pos === players.length - 1) {
        console.log(colpositions.length - 1);
        positions.push([rowpositions[1], colpositions[colpositions.length - 1]]);
      } else {
        positions.push([rowpositions[1], colpositions[pos - halfplayers]]);
      }
    } else {
      positions.push([rowpositions[0], colpositions[pos]]);
    }
  }

  for (let i = 0; i < players.length; i++) {
    const position = positions[i];
    board[position[0]][position[1]].value = 3;
    board[position[0]][position[1]].player = players[i].id;
    board[position[0]][position[1]].color = players[i].color;
  }

  return board;
};

// //=>

//

const setGame = (width, height, board, players) => {
  const positions = [[1, 1], [1, width - 2], [height - 2, 1], [height - 2, width - 2]];

  if (players.length <= 4) {
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

// //=>

//

const gameBoard = (width = 8, height = 8, player = 2) => {
  const board = setBoard(width, height);
  const players = setPlayers(player);
  const game = setGame(width, height, board, players);

  return game;
};

module.exports = {
  gameBoard
};
