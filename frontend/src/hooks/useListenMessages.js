import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { useSelectedConversation } from "../context/selectedConversationContext";
import notificationsound from "../assets/notification.mp3";
const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useSelectedConversation();
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			console.log("New message received:", newMessage);	
			setMessages(prev => [...prev, newMessage]);
			const sound=new Audio(notificationsound);
			sound.play();
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages,messages]);
};
export default useListenMessages;
