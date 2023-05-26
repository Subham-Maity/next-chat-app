import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useRef } from "react";

const RoomsContainer = () => {
	const { socket, roomId, rooms } = useSocket();
	const newRoomRef = useRef<HTMLInputElement>(null);
	// Add a ref for the timer input
	const timerRef = useRef<HTMLInputElement>(null);
	// Add a ref for the checkbox input
	const checkboxRef = useRef<HTMLInputElement>(null);

	function handleNewRoom() {
		// get the room name
		const roomName = newRoomRef.current?.value || "";

		if (!String(roomName).trim()) return;

		// emit room created event
		socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

		// set room name input to empty string
		newRoomRef.current!.value = "";

		// get the timer value
		const timerValue = timerRef.current?.value || "";

		// get the checkbox value
		const checkboxValue = checkboxRef.current?.checked || false;

		// check if the checkbox is checked and the timer value is valid
		if (checkboxValue && Number(timerValue) > 0) {
			// emit set timer event with the timer value
			socket.emit(EVENTS.CLIENT.SET_TIMER, Number(timerValue));
		}

		// clear the timer and checkbox inputs
		timerRef.current!.value = "";
		checkboxRef.current!.checked = false;
	}

	function handleJoinRoom(key: string) {
		if (key === roomId) return;

		// emit join room event
		socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);

		// emit request timer event
		socket.emit(EVENTS.CLIENT.REQUEST_TIMER);
	}

	return (
		<nav className="w-64 bg-gray-200 h-screen p-4">
			<div className="pb-4 border-b">
				<input
					className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
					placeholder="Room Name"
					ref={newRoomRef}
				/>
				{/* Add an input for the timer value */}
				<input
					className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
					placeholder="Timer (in minutes)"
					type="number"
					min="1"
					ref={timerRef}
				/>
				{/* Add an input for the checkbox */}
				<label className="flex items-center mb-2">
					<input type="checkbox" ref={checkboxRef} />
					<span className="ml-2">Enable timer</span>
				</label>
				<button
					onClick={handleNewRoom}
					className="px-4 py-2 text-white bg-blue-500 rounded"
				>
					Create Room
				</button>
			</div>

			<ul className="list-none">
				{Object.keys(rooms).map((key) => (
					<li key={key} className="mb-2">
						<button
							disabled={key === roomId}
							title={`Join ${rooms[key].name}`}
							onClick={() => handleJoinRoom(key)}
							className={`w-full px-4 py-2 ${
								key === roomId ? "bg-gray-500" : "bg-blue-500"
							} text-white rounded`}
						>
							{rooms[key].name}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default RoomsContainer;
