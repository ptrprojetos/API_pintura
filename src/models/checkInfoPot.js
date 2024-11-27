const mqtt = require('mqtt');

async function fetchDatas() {
  const mqttconnect02 = process.env.MQTT_CONNECT;
  const client = mqtt.connect(mqttconnect02);
  const info = {};

  try {
    const response = await Promise.race([
      new Promise((resolve, reject) => {
        client.on('connect', () => {
          client.subscribe('DHT22_temperatura_pintura_sensor01');
          client.subscribe('DHT22_umidade_pintura_sensor01');
        });

        client.on('message', (topic, payload) => {
          if (topic === 'DHT22_temperatura_pintura_sensor01') {
            info.temperatura = payload.toString();
          } else if (topic === 'DHT22_umidade_pintura_sensor01') {
            info.umidade = payload.toString();
          }

          // Resolva a promise quando ambas as informações forem obtidas
          if (info.temperatura && info.umidade) {
            resolve(info);
            client.end();
          }
        });

        // Rejeite em caso de erro no cliente MQTT
        client.on('error', (error) => {
          reject(new Error(`Erro no cliente MQTT: ${error.message}`));
        });
      }),
      new Promise((_, reject) =>
        setTimeout(() => {
          client.end(); // Fecha o cliente após o timeout
          reject(new Error('Timeout de 8 segundos atingido'));
        }, 8000)
      ),
    ]);

    console.log('Resposta obtida:', response);
    return response;
  } catch (error) {
    console.error('Erro encontrado ou timeout:', error);
    return { mensage: 'Não foi possível obter os dados em 10 segundos' };
  }
}


module.exports = {
  fetchDatas,
};
