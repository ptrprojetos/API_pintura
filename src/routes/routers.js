const express = require('express');
const {
  getTempAndUmi,
  getTempAndUmi02,
  getTempAndUmi03,
} = require('../controller/controllerTempAndUmi');

const apiRouter = express.Router();

apiRouter.get('/potlife', getTempAndUmi);
apiRouter.get('/sensor02', getTempAndUmi02);
apiRouter.get('/sensor03', getTempAndUmi03);

module.exports = { apiRouter };
