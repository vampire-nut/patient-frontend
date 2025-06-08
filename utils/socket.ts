import { io } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const socket = io(BACKEND_URL, {
  reconnectionAttempts: 5, 
  reconnectionDelay: 1000, 
  reconnectionDelayMax: 5000, 
  forceNew: true 
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server. Reason:', reason);
  if (reason === 'io server disconnect') {
    console.log('Server initiated disconnect, attempting to reconnect...');
    socket.connect();
  }
});

socket.on('connect_error', (err) => {
  console.error('WebSocket connection error:', err.message);
});

export default socket;