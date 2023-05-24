'use client';
// page.tsx

"use client";
import MessagesContainer from "@/app/containers/Messages";
import RoomsContainer from "@/app/containers/Rooms";
import { useSocket } from "@/app/context/socket.context";
import { useEffect, useRef } from "react";

export default function Home() {
  const { socket, username, setUsername } = useSocket();
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
      // wrap the elements with a div
      <div>
        {!username ? (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <input
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-lg"
                    placeholder="Username"
                    ref={usernameRef}
                />
                <button
                    onClick={handleUsername}
                    className="px-4 ml-2 py-2 text-white bg-pink-500 rounded-lg shadow-lg"
                >
                  Set Username
                </button>
              </div>
            </div>
        ) : (
            // wrap the elements with a div
            <div className="flex overflow-hidden">
              <RoomsContainer />
              <MessagesContainer />
            </div>
        )}
      </div>
  );
}


