import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // connect to backend

function Chat() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off('receiveMessage'); // cleanup
  }, []);

  const sendMessage = () => {
    if (name && message) {
      const data = { name, message };
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-inputs">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
