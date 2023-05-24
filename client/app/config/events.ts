// /config/events.ts

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
		ROOM_ADMIN: "ROOM_ADMIN", // add this event
		ROOM_TIME_LIMIT: "ROOM_TIME_LIMIT", // add this event
	},
};

export default EVENTS;
