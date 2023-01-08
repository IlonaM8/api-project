

import luckyDraw from './luckyDraw.mjs';



luckyDraw('Joe')
  .then((result) => {
    console.log(result);
    return luckyDraw('Caroline');
  })
  .then((result) => {
    console.log(result);
    return luckyDraw('Sabrina');
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  });



