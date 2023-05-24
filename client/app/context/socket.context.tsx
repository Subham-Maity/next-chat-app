"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "@/app/config/default";
import EVENTS from "@/app/config/events";


type Message = {
	message: string;
	username: string;
	time: string;
};

interface SocketContext {
	socket: Socket;
	username?: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	roomId?: string;
	rooms: Record<string, { name: string }>;
	messages?: Message[];
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	admin?: string; // Admin of the room
	timeLimit?: number; // Time limit of the room
}

interface Props {
	children: React.ReactNode;
}

export const socket = io(SOCKET_URL);
export const SocketContext = createContext<SocketContext>({
	socket,
	setUsername: () => {},
	rooms: {},
	messages: [],
	setMessages: () => {},
});

export const SocketProvider = ({ children }: Props) => {
	const [username, setUsername] = useState("");
	const [roomId, setRoomId] = useState("");
	const [rooms, setRooms] = useState({});
	const [admin, setAdmin] = useState(""); // add this state variable
	const [timeLimit, setTimeLimit] = useState(0); // add this state variable
	const [messages, setMessages] = useState<Message[]>([]); // add a default value of an

	socket.on(EVENTS.SERVER.ROOMS, (name: string) => {
		setRooms(name);
	});

	socket.on(EVENTS.SERVER.JOINED_ROOM, (id: string) => {
		setRoomId(id);
		setMessages([]);
	});

	useEffect(() => {
		window.onfocus = () => {
			document.title = "Chat App";
		};
	}, []);

	useEffect(() => {
		// add this listener for ROOM_ADMIN event
		socket.on(EVENTS.SERVER.ROOM_ADMIN, (admin: string) => {
			setAdmin(admin);
		});

		// add this listener for ROOM_TIME_LIMIT event
		socket.on(EVENTS.SERVER.ROOM_TIME_LIMIT, (timeLimit: number) => {
			setTimeLimit(timeLimit);
		});
	}, [socket]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				username,
				setUsername,
				rooms,
				roomId,
				messages,
				setMessages,
				admin, // add this value
				timeLimit, // add this value
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;

export const useSocket = () => {
	return useContext(SocketContext);
};
