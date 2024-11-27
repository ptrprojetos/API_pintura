const mqtt = require('mqtt');

async function getTemperatureAndHumity03() {
    const mqttconnect = process.env.MQTT_CONNECT
    const client = mqtt.connect(mqttconnect);
    const info = {};
    try {
        const response = await Promise.race([
            new Promise((resolve, reject) => {
                client.on('connect', () => {
                    client.subscribe('DHT22_temperatura_pintura_sensor03');
                    client.subscribe('DHT22_umidade_pintura_sensor03');
                });

                client.on('message', (topic, payload) => {
                    if (topic === 'DHT22_temperatura_pintura_sensor03') {
                        info.temperatura = payload.toString();
                    } else if (topic === 'DHT22_umidade_pintura_sensor03') {
                        info.umidade = payload.toString();
                    }
                    if (info.temperatura && info.umidade) {
                        resolve(info);
                        client.end();
                    }

                })
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
        ])

        return response;
    } catch (error) {
        console.log(error);
        return { mensage: 'Não foi possível obter os dados em 10 segundos' };

    }
}

module.exports = { getTemperatureAndHumity03 }