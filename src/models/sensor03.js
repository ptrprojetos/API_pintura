const mqtt = require('mqtt');

async function getTemperatureAndHumity03() {
    try {
        const mqttconnect = process.env.MQTT_CONNECT
        const client = mqtt.connect(mqttconnect);
        const info = {};
        const response = await new Promise((resolve, reject) => {
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

                console.log()
                if (info.temperatura && info.umidade) {
                    resolve(info);
                    client.end();
                }
            });
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getTemperatureAndHumity03 }