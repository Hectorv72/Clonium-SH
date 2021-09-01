/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const { setGame, setBoard, setPlayers } = require('../components/clonium/gameboard.component');
const fs = require('fs');

const getBoards = () => {
  const boards = fs.readFileSync('./resources/json/board.json');
  console.log();
  if (boards.toString() === '') {
    return [];
  } else {
    const json = JSON.parse(boards);
    return json;
  }
};

const writeJsonFile = (string) => {
  fs.writeFile('./resources/json/board.json', string, (err) => {
    if (err) throw err;
    console.log('Archivo creado');
  });
};

const updateBoard = (room, turn, board) => {
  const boards = getBoards();
  if (boards !== undefined) {
    const newboard = boards.find(element => element.room === room);
    if (newboard !== undefined) {
      newboard.board = board;
      newboard.turn = turn;
      writeJsonFile(JSON.stringify(boards));
    }
  }
};

const saveBoard = (room, player, board) => {
  const list = getBoards();
  const game = {
    room: room,
    players: player,
    turn: 1,
    board: board
  };

  list.push(game);
  writeJsonFile(JSON.stringify(list));
  return game;
};

const getBoard = (room) => {
  const boards = getBoards();
  if (boards.length !== 0) {
    const board = boards.find(element => element.room === room);
    return board;
  } else {
    return undefined;
  }
};

// Llama a los eventos de creacion del juego
const gameBoard = (room, width = 8, height = 8, player = 2) => {
  const prevBoard = getBoard(room);
  let mesa;
  if (prevBoard === undefined) {
    const board = setBoard(width, height);
    const players = setPlayers(player);
    const game = setGame(width, height, board, players);
    saveBoard(room, player, game);
    mesa = { turn: 1, board: game };
  } else {
    mesa = { turn: prevBoard.turn, board: prevBoard.board };
  }
  return mesa;
};

module.exports = { gameBoard, getBoard, updateBoard };
