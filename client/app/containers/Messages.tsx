'use client';

import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi"; // import send icon from React Icon Library
import { motion } from "framer-motion"; // import motion component from Framer Motion

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
		// add dark theme and rounded corners to the container
		<div className="overflow-y-scroll p-4 flex-grow mx-auto md:w-2/3 lg:w-1/2 my-scrollbar bg-stone-900/25 rounded-2xl mt-4 mb-2">
			<div className="flex-1 h-screen flex flex-col rounded-lg">
				<div className="mb-20"></div>

				{/* add flexbox utilities to center and margin the message box */}

				{messages?.map(({ message, username, time }, index) => (
					// use motion component to animate each message
					<motion.div
						key={index}
						className="bg-stone-300 rounded-b-2xl mb-4 p-4 border"
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

							<div className=" text-base bg-gray-800 text-gray-200 rounded-lg p-2 shadow-lg">{message}</div>
						</div>
					</motion.div>
				))}
				<div ref={messagesEndRef} />
			</div>
			{/* message box */}
			<div className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-300/50 to-indigo-900/45 p-4 border-t border-cyan-400 flex items-center pointer-events-none " style={{position: "fixed", bottom: 0}}>

				<motion.textarea
					className="w-full p-4 text-base rounded-lg shadow-lg bg-stone-300 pointer-events-auto"
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
					className="px-12 py-5 ml-2 text-stone-300 bg-cyan-500 rounded-lg pointer-events-auto"
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
