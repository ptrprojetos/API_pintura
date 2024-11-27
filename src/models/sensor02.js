const mqtt = require('mqtt');


async function getTemperatureAndHumity02() {
  const mqttconnect02 = process.env.MQTT_CONNECT
  const client02 = mqtt.connect(mqttconnect02);
  const info = {};
  try {
    const response = await Promise.race([
      new Promise((resolve, reject) => {
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
        client02.on('error', (error) => {
          reject(new Error(`Erro no cliente MQTT: ${error.message}`));
        });
      }),
      new Promise((_, reject) => setTimeout(() => {
        client02.end()
        reject(new Error('Timeout de 8 sec atingido'))
      }, 8000)
      )
    ])

    return response;
  } catch (error) {
    console.log(error);
    return { mensage: 'Não foi possível obter os dados em 10 segundos' };
  }
}


module.exports = { getTemperatureAndHumity02 }