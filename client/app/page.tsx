"use client";

import MessagesContainer from "@/app/containers/Messages";
import RoomsContainer from "@/app/containers/Rooms";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";

export default function Home() {
  const { socket, username, setUsername, timer } = useSocket(); // Add timer here
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleUsername() {
    const value = usernameRef.current?.value || "";

    if (!value) return;

    setUsername(value);

    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef) {
      usernameRef.current!.value = localStorage.getItem("username") || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div>
        {!username ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
              <div className="bg-white p-8 rounded">
                <input
                    className="mb-4 px-4 py-2 border border-gray-300 rounded"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <button
                    onClick={handleUsername}
                    className="px-4 ml-2 py-2 text-white bg-pink-500 rounded"
                >
                  Set Username
                </button>
              </div>
            </div>
        ) : (
            <div className="flex overflow-hidden">
              <RoomsContainer />
              {/* Add a div element to wrap the MessagesContainer and the timer */}
              <div className="flex flex-col flex-grow relative">
                {/* Add some Tailwind classes to position the timer on the right side of the screen */}
                {timer && (
                    <div className="absolute top-0 right-0 m-4 text-white bg-purple-500 px-4 py-2 rounded-lg shadow-lg">
                      Time remaining: {Math.floor(timer / 60)}m {timer % 60}s{" "}
                    </div>
                )}
                <MessagesContainer />
              </div>
            </div>
        )}
      </div>
  );
}

