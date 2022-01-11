import React, { useCallback, useContext } from 'react'
import { ShortStatus } from "./ShortStatus";
import { ChartView } from "./ChartView";
import { useEffect, useState } from 'react';
import { SocketContext, SOCKET_ACTION } from '../services/SocketContext';
import useLocalStorage from "../services/StorageHook";


export const Dashboard = () => {

    const sockContext = useContext(SocketContext);

    const socket = sockContext.socket;
    const [uuid, setUuid] = useLocalStorage("uuid", 'test');
    const [status, setStatus] = useState("Not Connected");
    useEffect(() => {
        setStatus(socket.connected ? "Connected" : "No Response")

    }, [socket]);

    useEffect(() => {
        console.log(uuid)
    }, [uuid])


    const startinfo = useCallback(() => {
        if (socket.connected) {
            sockContext.cpuDispatch(SOCKET_ACTION.EMIT)
            setStatus("Connected")
            socket.on("connect", () => {
                ///socket.emit('allcurrentinfo', "FromDashboard")
                console.log("calling allcurrentinfo")
            })
            console.log("calling allcurrentinfo outside " + socket.connected)
        } else {
            setStatus("No Response")
            alert("Socket.connected : " + socket.connected)
        }

    }, [socket])


    return (

        <div className="content-wrapper">
            <div className="container">
                <div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark"> Raspberry Pie <small>System Monitor</small></h1>
                            </div>
                            <div className="col-sm-6 d-flex flex-row justify-content-end">
                                <button className="btn btn-info" onClick={startinfo}>Connect</button>
                                <p className='pl-3 my-auto'>{status}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="content">
                    <ShortStatus />
                    <ChartView />
                </div>

            </div>
        </div>
    )
}
