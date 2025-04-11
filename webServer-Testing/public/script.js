const socket = io();

// Send message to server
function sendMessage(command) {
    fetch('/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: command }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(`Sent: ${command}`);
        }
    })
    .catch(err => console.error('Error:', err));
}

// Handle incoming MQTT messages
socket.on('mqttMessage', (data) => {
    const values = data.message.split(','); // Split incoming message by commas
    const table = document.getElementById('channel-table');

    // Clear existing rows, leaving the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Display the 8 values as rows
    values.forEach((value, index) => {
        const row = table.insertRow(-1); // Add a new row
        const cell1 = row.insertCell(0); // Channel number
        const cell2 = row.insertCell(1); // Value

        cell1.textContent = `Channel ${index}`;
        cell2.textContent = value.trim(); // Remove whitespace
    });
});

