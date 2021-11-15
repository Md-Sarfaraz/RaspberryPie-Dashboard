import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const socket = io("http://192.168.100.125:9080")


export const ShortStatus = (props) => {

    const [cputemp, setCputemp] = useState(0)
    const [cpuusage, setCpuusage] = useState(0)
    const [ramused, setRamused] = useState(0)
    

    useEffect(() => {
        console.log(" first  Test")
        socket.on("allcurrentinfo", (cpu) => {
            let temper
            temper = cpu.temperature.toFixed(2)
            setCputemp(temper)
            setCpuusage(cpu.usage)
            setRamused(cpu.percentUsedRam)
            //console.log("cpu : "+ cpu)
        });
    }, []);


    useEffect(() => {
        if (socket.connected === false) {
            socket.emit("allcurrentinfo", () => {
                console.log(" checking ")
                socket.close()
            });
        }
    });


    return (
        <div>
            <div className="container my-3" >
                <div className="row">
                    <div className="col-sm-3">
                        <div className="info-box">
                            <span className="info-box-icon bg-danger elevation-2">
                                <i className="fas fa-heartbeat"></i></span>
                            <div className="info-box-content ml-2">
                                <span className="info-box-text">CPU Temperature</span>
                                <span className="info-box-number">
                                    {cputemp} <small> %</small>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="info-box">
                            <span className="info-box-icon bg-warning elevation-2">
                                <i className="fas fa-microchip"></i></span>
                            <div className="info-box-content ml-2">
                                <span className="info-box-text">CPU Usage</span>
                                <span className="info-box-number">
                                    {cpuusage} <small> %</small>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="info-box">
                            <span className="info-box-icon bg-info elevation-2">
                                <i className="fas fa-server"></i></span>
                            <div className="info-box-content ml-2">
                                <span className="info-box-text">RAM Usage</span>
                                <span className="info-box-number">
                                    {ramused} <small> %</small>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="info-box">
                            <span className="info-box-icon bg-success elevation-2">
                                <i className="fas fa-server"></i></span>
                            <div className="info-box-content ml-2">
                                <span className="info-box-text">Disk Usage</span>
                                <span className="info-box-number">
                                    {} <small> %</small>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
