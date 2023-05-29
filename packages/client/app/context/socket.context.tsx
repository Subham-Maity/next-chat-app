"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import io from "socket.io-client";
import {SOCKET_URL} from "@/app/config/default";
import EVENTS from "@/app/config/events";
import {Socket} from "socket.io-client";


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
    timer?: number | null; // Change this line
    setTimer: React.Dispatch<React.SetStateAction<number | null>>; // Change this line
    amount?: number | null; // Add this line
    setAmount: React.Dispatch<React.SetStateAction<number | null>>; // Add this line
    balance?: number | null; // Add this line
    setBalance: React.Dispatch<React.SetStateAction<number | null>>; // Add this line
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
    timer: null,
    setTimer: () => {},
    amount: null, // Add this line
    setAmount: () => {}, // Add this line
    balance: null, // Add this line
    setBalance: () => {}, // Add this line
});

export const SocketProvider = ({children}: Props) => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState<Message[]>([]);
    const [timer, setTimer] = useState<number | null>(null); // Change this line
    const [amount, setAmount] = useState<number | null>(null); // Add this line
    const [balance, setBalance] = useState<number | null>(null); // Add this line

    function convertAmountToSeconds(amount: number) {
        return amount;
    }

// Add a function to calculate time-based amount based on a fixed rate (1 sec = 1/-)
    function calculateTimeBasedAmount(seconds: number) {
        return seconds;
    }

// Add a function to calculate current balance based on entered amount and time-based amount
    function calculateCurrentBalance(amount: number, timeBasedAmount: number) {
        return amount - timeBasedAmount;
    }

// Add a function to handle the wallet button click
    function handleWallet() {
        // Get the amount value from the input ref
        const value = amountRef.current?.value || "";

        // Check if the value is valid and positive
        if (Number(value) > 0) {
            // Set the amount state variable to the value
            setAmount(Number(value));

            // Set the balance state variable to the value
            setBalance(Number(value));

            // Emit an event to the server with the amount value
            socket.emit(EVENTS.CLIENT.SET_AMOUNT, Number(value));
        } else {
            // Alert the user that the value is invalid or negative
            alert("Please enter a valid and positive amount.");
        }
    }


    socket.on(EVENTS.SERVER.ROOMS, (name: string) => {
        setRooms(name);
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (id: string) => {
        setRoomId(id);
        setMessages([]);
        setTimer(null);
    });

    useEffect(() => {
        window.onfocus = () => {
            document.title = "Chat App";
        };
    }, []);

    useEffect(() => {
        socket.on(EVENTS.SERVER.ROOM_MESSAGE, (message: Message) => {
            if (!document.hasFocus()) {
                document.title = "New message...";
            }

            setMessages((messages) => [...messages, message]);
        });
        socket.on(EVENTS.SERVER.TIMER_SET, (duration: number) => {
            setTimer(duration * 60); // Convert minutes to seconds for easier calculation
        });
        socket.on(EVENTS.SERVER.TIMER_UPDATE, (currentTime: number) => {
            setTimer(currentTime); // Update the timer value with the current time from the server
        });
        socket.on(EVENTS.SERVER.CONVERSATION_ENDED, () => {
            alert("The conversation has ended."); // Alert the user that the conversation has ended
            setTimer(null); // Reset the timer value to null
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                timer,
                setTimer,
                amount, // Add this line
                setAmount, // Add this line
                balance, // Add this line
                setBalance, // Add this line
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

// Remove this line
export default SocketProvider;

export const useSocket = () => {
    return useContext(SocketContext);
};
