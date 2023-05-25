
import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
	connection: "connection",
	CLIENT: {
		CREATE_ROOM: "CREATE_ROOM",
		SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
		JOIN_ROOM: "JOIN_ROOM",
		SET_TIMER: "SET_TIMER",
		REQUEST_TIMER: "REQUEST_TIMER",
	},
	SERVER: {
		ROOMS: "ROOMS",
		JOINED_ROOM: "JOINED_ROOM",
		ROOM_MESSAGE: "ROOM_MESSAGE",
		TIMER_SET: "TIMER_SET",
		TIMER_UPDATE: "TIMER_UPDATE",
		CONVERSATION_ENDED: "CONVERSATION_ENDED",
	},
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {

// Initialize the timer value to null
	let timerValue = null;
// Initialize an interval function to null
	let intervalFunction = null;
// Initialize a set to store the connected clients
	const connectedClients = new Set();

	io.on(EVENTS.connection, (socket) => {

// Listen for the client setting a timer for a room
		socket.on(EVENTS.CLIENT.SET_TIMER, (duration) => {
// Set the timer value to the received duration
			timerValue = duration;
// Emit the timer value to all clients in the room
			io.emit(EVENTS.SERVER.TIMER_SET, duration);
// Check if there are two clients connected in the room
			if (connectedClients.size === 2) {
// Clear any existing interval function
				if (intervalFunction) {
					clearInterval(intervalFunction);
				}
// Set the current time to the timer value
				let currentTime = timerValue;
// Create a new interval function that runs every second
				intervalFunction = setInterval(() => {
// Decrement the current time by one
					currentTime -= 1;
// Emit the current time to all clients in the room
					io.emit(EVENTS.SERVER.TIMER_UPDATE, currentTime);
// Check if the current time is zero
					if (currentTime === 0) {
// Clear the interval function
						clearInterval(intervalFunction);
// Emit the conversation ended event to all clients in the room
						io.emit(EVENTS.SERVER.CONVERSATION_ENDED);
					}
				}, 1000);
			}
		});

// Listen for a client joining a room
		socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {

// Join the room with the given roomId
			socket.join(roomId);

// Emit an event back to room creator that they have joined the room
			socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);

// Check if there are two clients connected in the room and the timer value is not null
			if (connectedClients.size ===2 && timerValue !== null) {

// Clear any existing interval function
				if (intervalFunction) {
					clearInterval(intervalFunction);
				}

// Set the current time to the timer value
				let currentTime = timerValue;

// Create a new interval function that runs every second
				intervalFunction = setInterval(() => {

// Decrement the current time by one
					currentTime -=1;

// Emit the current time to all clients in the room
					io.emit(EVENTS.SERVER.TIMER_UPDATE, currentTime);

// Check if the current time is zero
					if (currentTime ===0) {

// Clear the interval function
						clearInterval(intervalFunction);

// Emit the conversation ended event to all clients in the room
						io.emit(EVENTS.SERVER.CONVERSATION_ENDED);
					}
				},1000);
			}

		});

// Listen for a client requesting a timer for a room
		socket.on(EVENTS.CLIENT.REQUEST_TIMER, () => {

// Check if there is a timer value for the room
			if (timerValue !== null) {

// Emit the timer value to the client who requested it
				socket.emit(EVENTS.SERVER.TIMER_SET,timerValue);
			}

		});

	});
}

export default socket;

