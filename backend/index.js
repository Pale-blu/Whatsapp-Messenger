const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './session' })
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('Client is ready'));
client.initialize();

app.get('/qr', (req, res) => {
    res.send('Check terminal for QR code.');
});

app.post('/send', async (req, res) => {
    const { numbers, message } = req.body;
    try {
        for (let number of numbers) {
            if (!number.startsWith('+')) number = '+91' + number;
            await client.sendMessage(number + '@c.us', message);
        }
        res.send('Messages sent!');
    } catch (e) {
        res.status(500).send('Error sending messages');
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
