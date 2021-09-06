/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const express       = require('express');
const router        = express.Router();
const { getOrCreateGameBoard } = require('../modules/clonium/game/clonium.module');
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
  const room  = req.params.room;
  const board = getOrCreateGameBoard(room, datos);
  // console.log(board);
  return res.send(JSON.stringify(board));
});

router.get('/:room/board', (req, res) => {
  const board = getBoard(req.params.room);
  // console.log(board);
  if (board !== undefined) {
    res.send(JSON.stringify({ exists: true, game: board }));
  } else {
    res.send(JSON.stringify({ exists: false }));
  }
});

// console.log(router);

module.exports = router;
