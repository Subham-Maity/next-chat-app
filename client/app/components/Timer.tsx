// /components/Timer.tsx

import React from "react";
import { useSocket } from "@/app/context/socket.context";

const Timer = () => {
    const { timeLimit, admin, messages } = useSocket(); // add a comma after messages

    const [isLive, setIsLive] = React.useState(false);
    const [secondsLeft, setSecondsLeft] = React.useState(timeLimit?.valueOf() || 60); // correct
    const [startDate, setStartDate] = React.useState<Date | null>(null); // add this state variable

    React.useEffect(() => {
        if ((messages?.length ?? 0) > 0 && !isLive) { // correct syntax
            setIsLive(true);
            setStartDate(new Date());
        }
        if ((messages?.length ?? 0) === 0 && isLive) { // use nullish coalescing
            setIsLive(false);
            setStartDate(null);
        }
    }, [messages]);

    React.useEffect(() => {
        if (isLive) {
            const timerId = setInterval(() => {
                if (startDate) {
                    // calculate the remaining seconds based on the start date and current date
                    const elapsedSeconds =
                        (new Date().getTime() - startDate.getTime()) / 1000;
                    setSecondsLeft((prevSeconds: number) => prevSeconds - elapsedSeconds); // add : number after prevSeconds
                    setStartDate(new Date()); // update the start date for next calculation
                }
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [isLive, startDate]);

    React.useEffect(() => {
        if (secondsLeft <= 0) {
            setIsLive(false);
            setStartDate(null); // reset the start date when time is up
        }
    }, [secondsLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    };

    return (
        <div className="flex items-center justify-center p-4 bg-gray-200">
            <div className="mr-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-gray-400">
                    <span className="text-xl font-bold">{formatTime(secondsLeft)}</span>
                </div>
            </div>
            <div className="text-xl font-bold">
                {isLive ? (
                    <span className="text-green-500">LIVE</span>
                ) : (
                    <span className="text-red-500">OFFLINE</span>
                )}
            </div>
            {admin && ( // add this condition to show admin name
                <div className="ml-4 text-xl font-bold">
                    Admin: {admin}
                </div>
            )}
        </div>
    );
};

export default Timer;
