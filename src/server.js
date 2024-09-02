const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { apiRouter } = require('./routes/routers');

const SERVER_HOST = process.env.HOST

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', apiRouter);

server.use((req, res) => {
  res.status(404).json({ error: 'endpoint not fould' });
});

server.listen(3333,SERVER_HOST , () => {
  console.log(`running ${SERVER_HOST}`);
  
});
