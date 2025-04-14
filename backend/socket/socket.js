import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
  };
  
const userSocketMap = {}; // { userId: [socketId1, socketId2, ...] }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);
    console.log(`${userId} connected with socket ${socket.id}`);
  }

  // Send online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId]) {
      userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);

      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(`${userId} disconnected from socket ${socket.id}`);
  });

  // Example event: broadcast message to all tabs of a user
  socket.on("sendMessageToUser", ({ receiverId, message }) => {
    const receiverSocketIds = userSocketMap[receiverId] || [];
    receiverSocketIds.forEach(socketId => {
      io.to(socketId).emit("newMessage", message);
    });
  });
   // Handle sending message to a group
   
});


export { app, io, server };