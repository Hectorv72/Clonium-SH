const fs = require('fs');
const { setGame, setBoard, setPlayers } = require('../process/gameboard.module');

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

const saveBoard = (object) => {
  const list = getBoards();

  list.push(object);
  writeJsonFile(JSON.stringify(list));
  return object;
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

const createBoard = (room, width = 8, height = 8, player = 2) => {
  const board = setBoard(width, height);
  const players = setPlayers(player);
  const boardgame = setGame(width, height, board, players);
  const game = { room: room, rows: height, cols: width, turn: 1, players: players, board: boardgame };
  return saveBoard(game);
};

module.exports = { getBoard, updateBoard, saveBoard, createBoard };
