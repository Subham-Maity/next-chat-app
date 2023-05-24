import EVENTS from "@/app/config/events";
import { useSocket } from "@/app/context/socket.context";
import { useRef } from "react";

const RoomsContainer = () => {
	const { socket, roomId, rooms } = useSocket();
	const newRoomRef = useRef<HTMLInputElement>(null);
	const timeLimitRef = useRef<HTMLInputElement>(null);

	function handleNewRoom() {
		const roomName = newRoomRef.current?.value || "";

		if (!String(roomName).trim()) return;

		const time = Number(timeLimitRef.current?.value) || 0;

		if (time <= 0) return;

		socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName, time }); // Pass the time value

		newRoomRef.current!.value = "";
		timeLimitRef.current!.value = "";
	}


	function handleJoinRoom(key: string) {
		if (key === roomId) return;

		socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
	}

	return (
		<nav className="w-64 bg-gray-200 h-screen p-4">
			<div className="pb-4 border-b">
				<input
					className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
					placeholder="Room Name"
					ref={newRoomRef}
				/>
				<input
					className="w-full px-4 py-2 mb-2 border border-gray-300 rounded"
					placeholder="Time Limit (minutes)"
					ref={timeLimitRef}
					type="number"
					min="1"
					max="60"
				/>
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
