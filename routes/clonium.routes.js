/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const express       = require('express');
const router        = express.Router();
const { gameBoard } = require('../modules/clonium.module');

router.get('/game', (req, res) => {
  res.render('page/inicio');
  // res.render('page/index');
});

router.get('/game/:room', (req, res) => {
  // res.send('probando');
  // req.params.room
  // res.send(req.params.room);
  res.render('page/index');
});

router.post('/:room/board', (req, res) => {
  const datos = req.body;
  const gameboard = gameBoard(req.params.room, datos.rows, datos.cols, datos.players.length);
  res.send(JSON.stringify({ room: req.params.room, turn: gameboard.turn, rows: datos.rows, cols: datos.cols, players: datos.players.length, board: gameboard.board })); //
});

// console.log(router);

module.exports = router;
