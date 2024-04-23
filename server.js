const express = require('express');
const cors = require('cors');
const { apiRouter } = require('./src/routes/routers');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', apiRouter);

server.listen(3333, () => {
  console.log('running!');
});
