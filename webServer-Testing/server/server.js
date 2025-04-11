const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const MqttHandler = require('./mqttHandler');

const app = express();
const PORT = 3000;

// Set up HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Initialize MQTT client
const mqttClient = new MqttHandler();
mqttClient.connect();

// Handle incoming MQTT messages and broadcast to clients
mqttClient.client.on('message', (topic, message) => {
    console.log(`MQTT Message: ${message.toString()} on topic: ${topic}`);
    io.emit('mqttMessage', { topic, message: message.toString() });
});

// API endpoint to publish MQTT messages
app.post('/publish', express.json(), (req, res) => {
    const { message } = req.body;
    mqttClient.publish('/seniorDesign/s2c', message);
    res.json({ success: true, message: `Message sent: ${message}` });
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
