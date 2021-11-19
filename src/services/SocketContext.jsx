import React, { useEffect, useReducer, useState } from 'react'
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.100.125:9080"

const initialState = {
    temperature: 0,
};
export const SOCKET_ACTION = {
    CONNECT: "connect",
    ON: 'on',
    OFF: 'off',
    DISCONNECT: "disconnect",
    EMIT: 'emit',
    IS_EMITTING: false,
}


const socket = io(SOCKET_URL, {
    //transports: ["websocket", "polling"],
    query: {
        x: 42,
        uuid: "testing123",
    }
});
export const SocketContext = React.createContext();
const reducer = (state, action) => {
    switch (action) {
        case SOCKET_ACTION.EMIT:
            let temp = {}
            if (!SOCKET_ACTION.IS_EMITTING) {
                socket.emit('allcurrentinfo', "FromDashboard")
                SOCKET_ACTION.IS_EMITTING = true
                socket.on("allcurrentinfo", (cpu) => {
                    temp = cpu
                    //console.log('from reducer : ' + state.temperature)
                    //return cpu

                });
                return temp

            }
            return state;
        case SOCKET_ACTION.ON:
            return state
        case SOCKET_ACTION.OFF:
            socket.off("allcurrentinfo");
            return initialState;
        default:
            return state;
    }
}

function SocketProvider({ children }) {
    const [state, setstate] = useState(initialState)
    const [cpuStat, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        socket.on("allcurrentinfo", (cpu) => {
            setstate(cpu)
        });
    }, [state])

    socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
            console.log("Dis Error >> " + reason)
        }
    });
    socket.on("connect_error", (error) => {
        socket.close()
        console.log("Conn Error >> " + error)
    });


    return (
        <SocketContext.Provider value={{
            socket: socket,
            cpuState: state,
            cpuDispatch: dispatch,
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { SocketProvider }
