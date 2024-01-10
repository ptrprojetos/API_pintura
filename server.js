const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3333;
const client = mqtt.connect('https://mqtt.eclipseprojects.io/');
const condi = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

client.on('connect', () => {
  client.subscribe('DHT11_temperatura_pintura_teste01');
  client.subscribe('DHT11_umidade_pintura_teste01');
  client.subscribe('cron_ink_start');
});

client.on('message', (topic, payload) => {
  if (topic === 'DHT11_temperatura_pintura_teste01') {
    condi.temperatura = payload.toString();
  } else if (topic === 'DHT11_umidade_pintura_teste01') {
    condi.umidade = payload.toString();
  }
  app.get('/condicao', (req, res) => {
    res.send(condi);
  });
});

app.post('/potlife', (req, res) => {
  const potlife = req.body.potlife.toString();
  res.send('POST recebido com sucesso');

  if (potlife) {
    console.log(potlife);
    client.publish('cron_ink_start', potlife);
  }
});

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
});
