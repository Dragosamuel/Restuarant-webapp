const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Emit a test event
  socket.emit('userRegistered', {
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    timestamp: new Date()
  });
  
  console.log('Emitted userRegistered event');
});

socket.on('newUserRegistered', (data) => {
  console.log('Received newUserRegistered event:', data);
});

socket.on('userLoggedInNotification', (data) => {
  console.log('Received userLoggedInNotification event:', data);
});

socket.on('newAdminNotification', (data) => {
  console.log('Received newAdminNotification event:', data);
});

// Keep the process running
setTimeout(() => {
  console.log('Test completed');
  process.exit(0);
}, 5000);