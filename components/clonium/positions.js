const colPositions = (width, halfplayers, cellspace) => {
  const colpositions = [1];
  for (let p = 1; p < halfplayers - 1; p++) {
    // if (p === (halfplayers - 1)) {
    //   if ((colpositions[p - 1] + cellspace) >= width - 1) {
    //     colpositions.push(Math.trunc(colpositions[p - 1] + (cellspace - 1)));
    //     continue;
    //   }
    // }
    colpositions.push(Math.trunc(colpositions[p - 1] + cellspace));
  }
  colpositions.push(width);

  return colpositions;
};

const rowPositions = (height, rowspace) => {
  return [1, height];
};

module.exports = {
  colPositions,
  rowPositions
};
