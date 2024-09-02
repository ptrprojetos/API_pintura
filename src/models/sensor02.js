const mqtt = require('mqtt');


async function getTemperatureAndHumity02() {
    try {
        const mqttconnect02 = process.env.MQTT_CONNECT
        const client02 = mqtt.connect(mqttconnect02);
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


  module.exports ={ getTemperatureAndHumity02}