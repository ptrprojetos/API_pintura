const mqtt = require('mqtt');

async function fetchDatas() {
  try {
    const client = mqtt.connect('https://mqtt.eclipseprojects.io/');
    const info = {};

    const response = await new Promise((resolve, reject) => {
      client.on('connect', () => {
        client.subscribe('DHT11_temperatura_pintura_teste01');
        client.subscribe('DHT11_umidade_pintura_teste01');
      });

      client.on('message', (topic, payload) => {
        if (topic === 'DHT11_temperatura_pintura_teste01') {
          info.temperatura = payload.toString();
        } else if (topic === 'DHT11_umidade_pintura_teste01') {
          info.umidade = payload.toString();
        }

        if (info.temperatura && info.umidade) {
          resolve(info);
          client.end();
        }
      });
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error('erro encontrado', error);
  }
}

module.exports = {
  fetchDatas,
};
