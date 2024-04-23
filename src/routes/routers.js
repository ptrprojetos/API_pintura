const express = require('express');
const getTempAndUmi = require('../controller/controllerTempAndUmi');

const apiRouter = express.Router();

apiRouter.get('/potlife', getTempAndUmi);

module.exports = { apiRouter };
