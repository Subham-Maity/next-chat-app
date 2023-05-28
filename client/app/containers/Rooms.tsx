import EVENTS from "@/app/config/events";
import {useSocket} from "@/app/context/socket.context";
import {useState, useRef} from "react";
// Import motion component from Framer Motion
import {motion} from "framer-motion";
// Import menu and chevron icons from React Icon Library
import {FiMenu, FiChevronLeft, FiChevronsRight} from "react-icons/fi";

const RoomsContainer = () => {
    const {socket, roomId, rooms} = useSocket();
    const newRoomRef = useRef<HTMLInputElement>(null);
    // Add a ref for the timer input
    const timerRef = useRef<HTMLInputElement>(null);
    // Add a ref for the checkbox input
    const checkboxRef = useRef<HTMLInputElement>(null);
    // Create a state variable to toggle the menu
    const [showMenu, setShowMenu] = useState(false);
    // Create a state variable to toggle the rooms container
    const [showRooms, setShowRooms] = useState(true);

    function handleNewRoom() {
        // get the room name
        const roomName = newRoomRef.current?.value || "";

        if (!String(roomName).trim()) return;

        // emit room created event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});

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

    function handleToggleMenu() {
        // toggle the visibility of the room list using the state variable
        setShowMenu(!showMenu);
    }

    function handleToggleRooms() {
        // toggle the visibility of the room container using the state variable
        setShowRooms(!showRooms);
    }

    return (
        // Add motion.nav component with animation props
        <motion.nav
            className="w-64 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-300/50 to-indigo-900/45 h-screen p-4 rounded-3xl"
            initial={{width: 0}} // initial state of width
            animate={{width: showRooms ? "auto" : 0}} // final state of width based on showRooms value
            transition={{duration: 0.5}} // duration of animation
            variants={{hidden: {opacity: 0}, visible: {opacity: 1}}} // variants for opacity based on showRooms value
        >
            <div className="pb-4 border-b border-gray-700">
                <motion.input
                    animate={{opacity: showRooms ? 1 : 0}}
                    transition={{duration: 0.5}}
                    className="w-full px-4 py-2 mb-2 border border-gray-300 bg-stone-300 rounded-lg shadow-lg"
                    placeholder="Room Name"
                    ref={newRoomRef}
                />
                {/* Add an input for the timer value */}
                <motion.input
                    animate={{opacity: showRooms ? 1 : 0}}
                    transition={{duration: 0.5}}
                    className="w-full px-4 py-2 mb-2 border border-gray-300 bg-stone-300 rounded-lg shadow-lg"
                    placeholder="Set Timer (in seconds)"
                    type="number"
                    min="1"
                    ref={timerRef}
                />
                {/* Add an input for the checkbox */}
                <label className="flex items-center mb-2 text-white">

                    <motion.span animate={{opacity: showRooms ? 1 : 0}}
                                 transition={{duration: 0.5}}
                                 className="ml-2">
                        <input className="mr-2" type="checkbox" ref={checkboxRef}/>
                        Enable timer
                    </motion.span>
                </label>
                <motion.button
                    onClick={handleNewRoom}
                    className="px-4 py-2 ml-2 text-white bg-cyan-500 rounded-lg shadow-lg"
                    animate={{opacity: showRooms ? 1 : 0}}
                    transition={{duration: 0.5}}

                >
                    Create Room
                </motion.button>

                {/* Add div element with flexbox properties */}
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                    {/* Add button element with hidebar icon */}
                    <button onClick={handleToggleRooms} className="block text-white text-2xl font-bold">
                        {/* Add CSS properties to position and size the hidebar icon */}
                        <FiChevronLeft size={64} style={{top: "10px", right: "0px", zIndex: "10"}}/>
                    </button>

                    {/* Move button element with menu icon below hidebar icon */}
                    {/* Use conditional rendering to show menu icon only when showRooms is true */}
                    {showRooms && (
                        <button onClick={handleToggleMenu} className="block text-white">
                            {/* Add CSS properties to position and size the menu icon */}
                            <FiMenu size={32} style={{position: "absolute", top: "220px", left: "10px", zIndex: "10"}}/>
                        </button>
                    )}
                </div>
            </div>

            {/* Add motion.div component with animation props */}
            {/* Use conditional rendering to show room list only when showRooms is true */}
            {showRooms && (
                <motion.div
                    className={`mt-4 my-scrollbar overflow-y-auto ${showMenu ? "block" : "hidden"} md:block`}
                    initial={{height: 0}} // initial state of height
                    animate={{height: showMenu ? "auto" : 0}} // final state of height based on showMenu value
                    transition={{duration: 0.5}} // duration of animation
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1}
                    }} // variants for opacity based on showMenu value
                >
                    <ul className="list-none">
                        {Object.keys(rooms).map((key) => (
                            <motion.li
                                key={key}
                                className="mb-2 pl-4 pr-4"
                                initial={{opacity: 0}} // initial state of opacity
                                animate={{opacity: 1}} // final state of opacity
                                transition={{duration: 1}} // duration of animation
                            >
                                <button
                                    disabled={key === roomId}
                                    title={`Join ${rooms[key].name}`}
                                    onClick={() => handleJoinRoom(key)}
                                    className={`w-full px-4 py-2 ${
                                        key === roomId ? "bg-gray-500" : "bg-blue-500"
                                    } text-white rounded-lg shadow-lg`}
                                >
                                    {rooms[key].name}
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Add motion.button component with blur and visible animation props */}
            <motion.button
                onClick={handleToggleRooms}
                className="block text-white"
                initial={{filter: "blur(5px)", opacity: 0}} // initial state of filter and opacity
                animate={{
                    filter: showRooms ? "blur(5px)" : "blur(0)",
                    opacity: showRooms ? 0 : 1
                }} // final state of filter and opacity based on showRooms value
                transition={{duration: 0.5}} // duration of animation
                whileHover={{scale: 1.2}} // scale effect on hover
                style={{
                    position: "absolute",
                    top: "120px",
                    left: "120px",
                    zIndex: "10",
                    animation: showRooms ? "" : "fadeIn 1s infinite alternate"
                }} // CSS properties for position, size and fadeIn animation
            >
                {/* Add CSS properties to position and size the showbar icon */}
                <FiChevronsRight size={64}/>
            </motion.button>
        </motion.nav>
    );
};

export default RoomsContainer;
