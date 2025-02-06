import { Server } from "socket.io";
import http from "http";
import express from "express";
const app=express();

console.log("mein isme hu");
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",  // Allow requests from localhost:3000
		methods: ["GET", "POST"],  // Allowed HTTP methods
		credentials: true  // Allow credentials if you need cookies/session data
	},
});

export const getReceiverSocketId = (receiverId) => {
	console.log("arey re");
	console.log(receiverId);
	console.log(userSocketMap[receiverId]);
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	console.log(userId);
	if (userId != "undefined") userSocketMap[userId] = socket.id;
       console.log( userSocketMap[userId]);
	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
