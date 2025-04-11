const mqtt = require('mqtt');

class MqttHandler {
    constructor() {
        this.host = 'mqtt://test.mosquitto.org'; // Broker URL
        this.port = 1883; // Default MQTT port
        this.client = null;
    }

    connect() {
        this.client = mqtt.connect(this.host);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('/seniorDesign/c2s', (err) => {
                if (!err) {
                    console.log('Subscribed to topic: /seniorDesign/c2s');
                }
            });
        });

        this.client.on('message', (topic, message) => {
            console.log(`Received message: ${message.toString()} on topic: ${topic}`);
        });

        this.client.on('error', (err) => {
            console.error('MQTT error:', err);
        });
    }

    publish(topic, message) {
        this.client.publish(topic, message, {}, (err) => {
            if (err) {
                console.error('Publish error:', err);
            }
        });
    }
}

module.exports = MqttHandler;
