const mqtt = require('mqtt');

const client = mqtt.connect('https://mqtt.eclipseprojects.io/');
const client02 = mqtt.connect(process.env.MQTT_CONNECT);

async function getTemperatureAndHumity03() {
  try {
    const info = {};
    const response = await new Promise((resolve, reject) => {
      client02.on('connect', () => {
        client02.subscribe('DHT22_temperatura_pintura_sensor03');
        client02.subscribe('DHT22_umidade_pintura_sensor03');
      });

      client02.on('message', (topic, payload) => {
        if (topic === 'DHT22_temperatura_pintura_sensor03') {
          info.temperatura = payload.toString();
        } else if (topic === 'DHT22_umidade_pintura_sensor03') {
          info.umidade = payload.toString();
        }
        if (info.temperatura && info.umidade) {
          resolve(info);
          client02.end();
        }
      });
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTemperatureAndHumity02() {
  try {
    const info = {};
    const response = await new Promise((resolve, reject) => {
      client02.on('connect', () => {
        client02.subscribe('DHT22_temperatura_pintura_sensor02');
        client02.subscribe('DHT22_umidade_pintura_sensor02');
      });

      client02.on('message', (topic, payload) => {
        if (topic === 'DHT22_temperatura_pintura_sensor02') {
          info.temperatura = payload.toString();
        } else if (topic === 'DHT22_umidade_pintura_sensor02') {
          info.umidade = payload.toString();
        }
        if (info.temperatura && info.umidade) {
          resolve(info);
          client02.end();
        }
      });
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchDatas() {
  try {
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
  getTemperatureAndHumity02,
  getTemperatureAndHumity03,
};
