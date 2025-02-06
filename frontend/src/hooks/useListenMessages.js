import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { useSelectedConversation } from "../context/selectedConversationContext";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useSelectedConversation();
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
