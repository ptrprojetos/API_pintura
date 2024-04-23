const express = require('express');
const cors = require('cors');
const { apiRouter } = require('./src/routes/routers');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', apiRouter);

server.use((req, res) => {
  res.status(404).json({ error: 'endpoint not fould' });
});

server.listen(3333, process.env.HOST, () => {
  console.log('running!');
});
