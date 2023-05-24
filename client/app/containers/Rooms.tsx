'use client';
// Room.tsx
import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useRef, useState } from "react"; // import useState hook
import { motion } from "framer-motion"; // import motion component from Framer Motion
import { FiMoreVertical } from "react-icons/fi"; // import more icon from React Icon Library

const RoomsContainer = () => {
	const { socket, roomId, rooms } = useSocket();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const [showMenu, setShowMenu] = useState(false); // create a state variable to toggle the menu

	function handleNewRoom() {
		// get the room name
		const roomName = newRoomRef.current?.value || "";

		if (!String(roomName).trim()) return;

		// emit room created event
		socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

		// set room name input to empty string
		newRoomRef.current!.value = "";
	}

	function handleJoinRoom(key: string) {
		if (key === roomId) return;

		socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
	}

	function handleToggleMenu() {
		// toggle the visibility of the room list using the state variable
		setShowMenu(!showMenu);
	}

	return (
		// add dark theme and rounded corners to the container
		<nav className="w-64 bg-gray-800 h-screen p-4 rounded-lg">

			<div className="pb-4 border-b border-gray-700">

				<input
					className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-lg"
					placeholder="Room Name"
					ref={newRoomRef}
				/>

				<button
					onClick={handleNewRoom}
					className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
				>
					Create Room
				</button>
			</div>

			<div className={`mt-4 overflow-y-auto ${showMenu ? "block" : "hidden"} md:block`}>
				<ul className="list-none">
					{Object.keys(rooms).map((key) => (

						<motion.li
							key={key}
							className="mb-2"
							initial={{ opacity: 0 }} // initial state of opacity
							animate={{ opacity: 1 }} // final state of opacity
							transition={{ duration: 0.5 }} // duration of animation
						>
							<button
								disabled={key === roomId}
								title={`Join ${rooms[key].name}`}
								onClick={() => handleJoinRoom(key)}
								// add rounded corners and shadow to the button
								className={`w-full px-4 py-2 ${
									key === roomId ? "bg-gray-500" : "bg-blue-500"
								} text-white rounded-lg shadow-lg`}
							>
								{rooms[key].name}
							</button>
						</motion.li>
					))}
				</ul>
			</div>


			<button onClick={handleToggleMenu} className="block md:hidden">
				<FiMoreVertical />
			</button>
		</nav>

	);
};

export default RoomsContainer;
