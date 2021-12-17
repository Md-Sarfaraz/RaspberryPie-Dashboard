import React from 'react'
import { io } from "socket.io-client";
//import { SOCKET_URL } from "config";

const SOCKET_URL = "http://192.168.100.125:9080"


const socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    query: {
        x: 42,
        uuid: "testing123",
    }
});
const SocketContext = React.createContext(socket);

function SocketProvider({ children }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

