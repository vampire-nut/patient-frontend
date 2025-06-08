import { io } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const socket = io(BACKEND_URL);

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (err) => {
  console.error('WebSocket connection error:', err.message);
});

export default socket;