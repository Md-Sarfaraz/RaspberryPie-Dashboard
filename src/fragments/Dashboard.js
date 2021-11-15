import React from 'react'

import { ShortStatus } from "./ShortStatus";
import { ChartView } from "./ChartView";
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = io("http://192.168.100.125:9080")


export const Dashboard = () => {

    const [status, setStatus] = useState("Not Connected")

    useEffect(() => {
        if (socket.connected === true) {
            setStatus("Connected")
            console.log("socket.connected : " + socket.connected)
        }else{
            setStatus("No Response")
            console.log("socket.connected : " + socket.connected)
        }
    },[]);



    return (

        <div className="content-wrapper py-3">
            <div className="container">
                <div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark"> Raspberry Pie <small>System Monitor</small></h1>
                            </div>
                            <div className="col-sm-6 d-flex flex-row justify-content-end">
                                <p>{status}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <ShortStatus />
                <ChartView />
            </div>
        </div>
    )
}
