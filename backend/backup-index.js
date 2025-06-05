const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Read numbers from file
const numbers = fs.readFileSync(path.join(__dirname, 'numbers.txt'), 'utf-8')
    .split('\n')
    .map(num => num.trim())
    .filter(Boolean);

// Read message from file
const message = fs.readFileSync(path.join(__dirname, 'message.txt'), 'utf-8').trim();

// Create client with saved session
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, 'session')
    })
});

// Display QR code for login
client.on('qr', qr => {
    console.log('Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// After successful login
client.on('ready', async () => {
    console.log('✅ WhatsApp client is ready!');

    for (let number of numbers) {
        const chatId = number + "@c.us";
        try {
            await client.sendMessage(chatId, message);
            console.log(`✅ Message sent to ${number}`);
        } catch (err) {
            console.log(`❌ Failed to send to ${number}: ${err.message}`);
        }
        await delay(4000 + Math.floor(Math.random() * 3000)); // 4–7s delay
    }

    console.log("🎉 All messages processed!");
    process.exit(0);
});

// Helper delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start client
client.initialize();
