/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const express       = require('express');
const router        = express.Router();
const { createGameBoard } = require('../modules/clonium/game/clonium.module');
const { getBoard } = require('../modules/clonium/game/board.module');

router.get('/game', (req, res) => {
  res.render('page/inicio');
});

router.get('/game/:room', (req, res) => {
  // req.params.room
  // res.send(req.params.room);
  res.render('page/index');
});

router.post('/:room/board', (req, res) => {
  const datos = req.body;
  const gameboard = createGameBoard(req.params.room, datos.rows, datos.cols, datos.players.length);
  res.send(JSON.stringify({ room: req.params.room, turn: gameboard.turn, rows: datos.rows, cols: datos.cols, players: datos.players.length, board: gameboard.board })); //
});

router.get('/:room/board', (req, res) => {
  const board = getBoard(req.params.room);
  if (board !== undefined) {
    res.send(JSON.stringify({ message: false }));
  } else {
    res.send(JSON.stringify({ message: true }));
  }
});

// console.log(router);

module.exports = router;
