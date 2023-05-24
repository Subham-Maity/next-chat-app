'use client';
// Room.tsx
import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useRef, useState, useEffect } from "react"; // import useEffect hook
import { motion } from "framer-motion"; // import motion component from Framer Motion
import { FiMenu, FiChevronLeft, FiChevronsRight } from "react-icons/fi"; // import menu and chevron icons from React Icon Library

const RoomsContainer = () => {
	const { socket, roomId, rooms } = useSocket();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const [showMenu, setShowMenu] = useState(false); // create a state variable to toggle the menu
	const [showRooms, setShowRooms] = useState(true); // create a state variable to toggle the rooms container

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

	function handleToggleRooms() {
		// toggle the visibility of the room container using the state variable
		setShowRooms(!showRooms);
	}

	useEffect(() => {
		// get the body element
		const body = document.querySelector("body");

		if (showRooms) {
			// remove a class to show overflow-x when rooms are visible
			body?.classList.remove("hidebar");
		} else {
			// add a class to hide overflow-x when rooms are hidden
			body?.classList.add("hidebar");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showRooms]);

	return (
		// add motion.nav component with animation props
		<motion.nav
			className="w-64 bg-gray-800 h-screen p-4 rounded-lg"
			initial={{ width: 0 }} // initial state of width
			animate={{ width: showRooms ? "auto" : 0 }} // final state of width based on showRooms value
			transition={{ duration: 0.5 }} // duration of animation
			variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }}} // variants for opacity based on showRooms value
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

				{/* add div element with flexbox properties */}

				<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
					{/* add button element with hidebar icon */}
					<button onClick={handleToggleRooms} className="block text-white">
						{/* add CSS properties to position and size the hidebar icon */}
						<FiChevronLeft size={64} style={{ top: "10px", right: "0px", zIndex: "10" }} />
					</button>

					{/* move button element with menu icon below hidebar icon */}
					{/* use conditional rendering to show menu icon only when showRooms is true */}
					{showRooms && (
						<button onClick={handleToggleMenu} className="block text-white">
							{/* add CSS properties to position and size the menu icon */}
							<FiMenu size={32} style={{ position: "absolute", top: "120px", left: "10px", zIndex: "10" }} />
						</button>
					)}
				</div>

			</div>

			{/* add motion.div component with animation props */}
			{/* use conditional rendering to show room list only when showRooms is true */}
			{showRooms && (
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
			)}

			{/* add motion.button component with blur and visible animation props */}
			<motion.button
				onClick={handleToggleRooms}
				className="block text-white"
				initial={{ filter: "blur(5px)", opacity: 0 }} // initial state of filter and opacity
				animate={{ filter: showRooms ? "blur(5px)" : "blur(0)", opacity: showRooms ? 0 : 1 }} // final state of filter and opacity based on showRooms value
				transition={{ duration: 0.5 }} // duration of animation
				whileHover={{ scale: 1.2 }} // scale effect on hover
				style={{ position: "absolute", top: "10px", left: "-20px", zIndex: "10", animation: showRooms ? "" : "fadeIn 1s infinite alternate" }} // CSS properties for position, size and fadeIn animation
			>
				{/* add CSS properties to position and size the showbar icon */}
				<FiChevronsRight size={64} />
			</motion.button>
		</motion.nav>

	);
};

export default RoomsContainer;
