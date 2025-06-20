import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"
import {getReceiverSocketId,io} from "../socket/socket.js"

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;//const receiverId=req.params.id same he h 
		const senderId = req.user._id;// ye user ki value protectroute middle ware se aayi h

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();  aise do baari mein karneg jyaada time lagega

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

         //socket io 
		 const receiverSocketId = getReceiverSocketId(receiverId);
		 console.log("receiverSocketId",receiverSocketId);	
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
			console.log(newMessage);
		}
		if(!receiverSocketId)
			console.log("bhaisaahb");
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
