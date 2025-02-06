import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";//.js likhna padta h import waale statements mein
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config();
db();
const port=process.env.PORT ||3000;
app.use(cors({
    origin:'http://localhost:5173',//i am using vite
    credentials:true
}))

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
server.listen(port,()=>{
    console.log(`listening on port ${port}`);
})

