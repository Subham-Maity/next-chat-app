import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";

const MessagesContainer = () => {
	const { messages, socket, roomId, username, setMessages, setTimer } =
		useSocket();
	const newMessageRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	function handleMessageSend() {
		const message = newMessageRef.current?.value;

		if (!String(message).trim()) {
			return;
		}

		socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
			roomId,
			message,
			username,
		});

		// No need to add the message to the state here as it will be added when received from the server

		newMessageRef.current!.value = "";
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	useEffect(() => {
		// No need to prompt user for timer value here as it will be done in RoomsContainer
	}, [roomId, socket]);

	if (!roomId) return <div />;

	return (
		<div className="flex-1 h-screen flex flex-col">
			<div className="overflow-y-scroll p-4 flex-grow">
				{messages?.map(({ message, username, time }, index) => (
					<div key={index} className="bg-white rounded mb-4 p-4 border">
						<div>
              <span className="text-sm">
                {username} - {time}
              </span>
							<div className="text-base">{message}</div>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			<div className="bg-purple-500 p-4">
        <textarea
			className="w-full p-4 text-base rounded"
			placeholder="Type a message..."
			rows={1}
			ref={newMessageRef}
		/>
			</div>

			<button
				onClick={handleMessageSend}
				className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
			>
				Send
			</button>
		</div>
	);
};

export default MessagesContainer;

