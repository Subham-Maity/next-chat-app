import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
	connection: "connection",
	CLIENT: {
		CREATE_ROOM: "CREATE_ROOM",
		SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
		JOIN_ROOM: "JOIN_ROOM",
	},
	SERVER: {
		ROOMS: "ROOMS",
		JOINED_ROOM: "JOINED_ROOM",
		ROOM_MESSAGE: "ROOM_MESSAGE",
		ROOM_DISCONNECTED: "ROOM_DISCONNECTED",
		ROOM_ADMIN: "ROOM_ADMIN",
		ROOM_TIME_LIMIT: "ROOM_TIME_LIMIT",
	},
};

const rooms: Record<string, { name: string; timeLimit: number }> = {};

function socket({ io }: { io: Server }) {
	io.on(EVENTS.connection, (socket: Socket) => {
		logger.info(`New client connected with id:${socket.id}`);
		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});

		// show all the rooms to the client
		socket.emit(EVENTS.SERVER.ROOMS, rooms);

		/**

		 * @param roomName
		 * @param timeLimit
		 */
		socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName, timeLimit }) => {
			console.log(`Client created ${roomName} with ${timeLimit} minutes`);


			const roomId = nanoid();


			rooms[roomId] = { name: roomName, timeLimit };


			socket.join(roomId);


			socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);


			socket.emit(EVENTS.SERVER.ROOMS, rooms);


			socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
		});

		/**

		 * @param roomId
		 * @param message
		 * @param username
		 */
		socket.on(
			EVENTS.CLIENT.SEND_ROOM_MESSAGE,
			({ roomId, message, username }) => {
				console.log(`Client sent a new message to ${roomId}`);

				const time = new Date(); // get the current time

				// emit an event to all clients in the room with this roomid
				socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
					message,
					username,
					time: `${time.getHours()}:${time.getMinutes()}`,
				});

				// emit an event to all clients in the room
				socket.to(roomId).emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, message);
			}
		);

		/**
		 * When a client joins a room
		 * @param roomId
		 */
		socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
			console.log(`Client joined ${roomId}`);


			socket.join(roomId);


			socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);


			const sockets = io.sockets.adapter.rooms.get(roomId);


			if (sockets.size > 1) {

				startTimer(roomId);
			}
		});
	});

	/**
	 * Start the countdown timer for a given room and disconnect both users when time is up
	 * @param roomId
	 */
	function startTimer(roomId: string) {
		console.log(`Starting timer for ${roomId}`);

		const timeLimit = rooms[roomId].timeLimit;

		const timeLimitMs = timeLimit * 60 * 1000;

		// emit these events before starting the timer
		io.to(roomId).emit(EVENTS.SERVER.ROOM_ADMIN, rooms[roomId]);
		io.to(roomId).emit(EVENTS.SERVER.ROOM_TIME_LIMIT, timeLimit);

		const timer = setTimeout(() => {
			console.log(`Time is up for ${roomId}`);

			// get all the sockets in the room
			const sockets = io.sockets.adapter.rooms.get(roomId);


			sockets.forEach((socketId) => {
				const socket = io.sockets.sockets.get(socketId);
				socket.leave(roomId);
			});


			io.to(roomId).emit(EVENTS.SERVER.ROOM_DISCONNECTED);


			delete rooms[roomId];


			io.emit(EVENTS.SERVER.ROOMS, rooms);


			clearTimeout(timer);
		}, timeLimitMs);
	}
}

export default socket;


