// backend/utils/socketHandler.js
import { Server } from 'socket.io';

let ioInstance = null;

export function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || '*' }
  });

  io.on('connection', socket => {
    console.log('Socket connected', socket.id);

    socket.on('join', ({ userId }) => {
      socket.join(`user_${userId}`);
    });

    socket.on('notify', ({ userId, title, body, data }) => {
      io.to(`user_${userId}`).emit('notification', { title, body, data });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });
  });

  ioInstance = io;
  return io;
}

export function emitToUser(userId, event, payload) {
  if (!ioInstance) return;
  ioInstance.to(`user_${userId}`).emit(event, payload);
}
