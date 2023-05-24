'use client';
// Room.tsx
import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useRef, useState, useEffect } from "react"; // import useEffect hook
import { motion } from "framer-motion"; // import motion component from Framer Motion
import { FiMenu, FiChevronLeft } from "react-icons/fi"; // import menu and chevron icons from React Icon Library

const RoomsContainer = () => {
	const { socket, roomId, rooms } = useSocket();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const [showMenu, setShowMenu] = useState(false); // create a state variable to toggle the menu
	const [showHidebar, setShowHidebar] = useState(false); // create a state variable to toggle the hidebar

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

	function handleToggleHidebar() {
		// toggle the visibility of the room container using the state variable
		setShowHidebar(!showHidebar);
	}

	useEffect(() => {
		// get the body element
		const body = document.querySelector("body");

		if (showHidebar) {
			// add a class to hide overflow-x when hidebar is toggled
			body.classList.add("hidebar");
		} else {
			// remove the class when hidebar is not toggled
			body.classList.remove("hidebar");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showHidebar]);

	return (
		// add motion.nav component with animation props
		<motion.nav
			className="w-64 bg-gray-800 h-screen p-4 rounded-lg"
			initial={{ width: 0 }} // initial state of width
			animate={{ width: showHidebar ? 0 : "auto" }} // final state of width based on showHidebar value
			transition={{ duration: 0.5 }} // duration of animation
			variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} // variants for opacity based on showHidebar value
		>

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

			{/* add motion.div component with animation props */}
			<motion.div
				className={`mt-4 overflow-y-auto ${showMenu ? "block" : "hidden"} md:block`}
				initial={{ height: 0 }} // initial state of height
				animate={{ height: showMenu ? "auto" : 0 }} // final state of height based on showMenu value
				transition={{ duration: 0.5 }} // duration of animation
				variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} // variants for opacity based on showMenu value
			>
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
			</motion.div>

			{/* move button element with menu icon to the end of nav component */}
			<button onClick={handleToggleMenu} className="block text-white">
				{/* add CSS properties to position and size the menu icon */}
				<FiMenu size={32} style={{ position: "absolute", top: "10px", left: "10px", zIndex: "10" }} />
			</button>

			{/* add button element with hidebar icon */}
			<button onClick={handleToggleHidebar} className="block text-white">
				{/* add CSS properties to position and size the hidebar icon */}
				<FiChevronLeft size={32} style={{ position: "absolute", top: "10px", right: "-10px", zIndex: "10" }} />
			</button>
		</motion.nav>

	);
};

export default RoomsContainer;

