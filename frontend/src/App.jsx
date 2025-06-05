import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';

export default function WhatsAppMessenger() {
  const [numbers, setNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numbers: numbers.split(',').map(n => n.trim()),
          message
        }),
      });
      const data = await response.text();
      setStatus(data);
    } catch (err) {
      setStatus('Failed to send messages');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '20px' }}>
        <h3>Bulk Sessions</h3>
        <ul>
          <li>Session 1</li>
          <li>Session 2</li>
        </ul>
        <Button onClick={() => alert('Add session not implemented')}>+ New Session</Button>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Send WhatsApp Message</h2>
        <Card>
          <CardContent>
            <label>Numbers (comma separated):</label>
            <Input value={numbers} onChange={e => setNumbers(e.target.value)} placeholder="+919999999999,+918888888888" />
            <label style={{ marginTop: '10px' }}>Message:</label>
            <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message here" />
            <div style={{ marginTop: '10px' }}>
              <Button onClick={sendMessages}>Send</Button>
            </div>
            {status && <p>{status}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
