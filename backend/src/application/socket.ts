import { Server } from 'socket.io'
import http from 'http'
import { app } from './web'

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['https://chat-app.ingsun.co'],
        methods: ['GET', 'POST'],
    },
    path: '/socket.io',
 });


const userSocketMap: Record<string, string> = {} // Map userId to socketId

// Function to get the socket ID of a receiver user
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Check if handshake query has userId
  console.log('Handshake query:', socket.handshake.query);

  const userId = socket.handshake.query.userId as string;

  if (userId && userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped user ${userId} to socket ${socket.id}`);
  } else {
    console.log('User ID is undefined or not provided');
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));
  
  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }
  });
});

export { app, io, server }
