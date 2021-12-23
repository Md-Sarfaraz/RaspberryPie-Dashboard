import React, { useContext, useEffect } from 'react'
import { SocketContext, SOCKET_ACTION } from '../services/SocketContext'


export const ShortStatus = (props) => {


    const socketContext = useContext(SocketContext)
    let cpuinfo = socketContext.cpuState


    // const [cputemp, setCputemp] = useState(0)
    // const [cpuusage, setCpuusage] = useState(0)
    // const [ramused, setRamused] = useState(0)


    // useEffect(() => {
    //     socket.on("allcurrentinfo", (cpu) => {
    //         let temper
    //         temper = cpu.temperature.toFixed(2)
    //         setCputemp(temper)
    //         setCpuusage(cpu.usage)
    //         setRamused(cpu.percentUsedRam)
    //         //console.log("cpu : "+ cpu)

    //         return ()=>{
    //             socket.off("allcurrentinfo");
    //         }
    //     });
    // }, [socket]);

    useEffect(() => {
       // console.log("check in effect : " + cpuinfo)

    }, [cpuinfo])

    //socketContext.cpuDispatch(SOCKET_ACTION.ON)


 

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
                                    {socketContext.cpuState.temperature} <small> %</small>
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
                                    {cpuinfo.usage} <small> %</small>
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
                                    {cpuinfo.percentUsedRam} <small> %</small>
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
                                    { } <small> %</small>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
