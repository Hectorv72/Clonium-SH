/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const express       = require('express');
const router        = express.Router();
const { gameBoard } = require('../modules/clonium.module');

router.get('/', (req, res) => {
  res.send('probando');
  // res.render('page/index');
});

router.post('/board', (req, res) => {
  const datos = req.body;
  const gameboard = gameBoard(datos.rows, datos.cols, datos.players.length);
  res.send(JSON.stringify({ rows: datos.rows, cols: datos.cols, players: datos.players.length, board: gameboard })); //
});

// console.log(router);

module.export = router;
