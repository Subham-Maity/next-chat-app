'use client';
import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi"; // import send icon from React Icon Library
import { motion } from "framer-motion"; // import motion component from Framer Motion

const MessagesContainer = () => {
	const { messages, socket, roomId, username, setMessages } = useSocket();
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

		const date = new Date();

		setMessages([
			...(messages as any),
			{
				message,
				username: "You",
				time: `${date.getHours()}:${date.getMinutes()}`,
			},
		]);

		newMessageRef.current!.value = "";
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	if (!roomId) return <div />;

	return (
		// add dark theme and rounded corners to the container
		<div className="flex-1 h-screen flex flex-col bg-gray-900 rounded-lg">

			{/* add flexbox utilities to center and margin the message box */}
			<div className="overflow-y-scroll p-4 flex-grow mx-auto md:w-2/3 lg:w-1/2">
				{messages?.map(({ message, username, time }, index) => (
					// use motion component to animate each message
					<motion.div
						key={index}
						className="bg-white rounded mb-4 p-4 border"
						initial={{ opacity: 0 }} // initial state of opacity
						animate={{ opacity: 1 }} // final state of opacity
						transition={{ duration: 0.5 }} // duration of animation
						// add flexbox utilities to align messages horizontally
						style={{ display: "flex", justifyContent: username === "You" ? "flex-end" : "flex-start" }}
					>
						<div>
              <span className="text-sm">
                {username} - {time}
              </span>
							{/* change the text color and shape */}
							<div className="text-base bg-gray-800 text-gray-200 rounded-lg p-2 shadow-lg">{message}</div>
						</div>
					</motion.div>
				))}
				<div ref={messagesEndRef} />
			</div>


			<div className="bg-purple-500 p-4 border-t border-purple-600 flex items-center">

				<motion.textarea
					className="w-full p-4 text-base rounded-lg shadow-lg bg-gray-100"
					placeholder="Type a message..."
					rows={1}
					ref={newMessageRef}
					initial={{ scale: 0 }} // initial state of scale
					animate={{ scale: 1 }} // final state of scale
					transition={{ duration: 0.5 }} // duration of animation
					whileTap={{ scale: 0.9 }} // scale down when tapped
				/>

				<motion.button
					onClick={handleMessageSend}
					className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
					initial={{ scale: 0 }} // initial state of scale
					animate={{ scale: 1 }} // final state of scale
					transition={{ duration: 0.5 }} // duration of animation
					whileTap={{ scale: 0.9 }} // scale down when tapped
				>
					<FiSend />
				</motion.button>
			</div>
		</div>
	);
};

export default MessagesContainer;
