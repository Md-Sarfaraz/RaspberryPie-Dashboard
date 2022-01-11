import { Line } from "react-chartjs-2";
import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { SocketContext, SOCKET_ACTION } from "../services/SocketContext";
import { useLocalStorage, useSessionStorage } from "../services/StorageHook";


let ctdata = []
let ctlabes = []

const livedata = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 13, 0, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 213, 0, 1)');
    gradient.addColorStop(0.8, 'rgba(0, 255, 0, 1');
    return {
        labels: ctlabes,
        datasets: [
            {
                label: 'CPU Temp',
                data: ctdata,
                fill: true,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 123, 255, 0.9)',
                tension: 0.4
            },
        ],
    }
};

const options = {
    pointStyle: 'line',
    hitRadius: 30,
    scales: {
        y: {
            min: 40.0,
            max: 60.0,
            grid: {
                display: true,
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    }
};

export const CpuCore = () => {

    const refchart = useRef()
    const { socket, cpuDispatch } = useContext(SocketContext)
    const [clientStatus, setClientStatus] = useSessionStorage("socket_status", "t")
    const [cpuSession, setCpuSession] = useLocalStorage("cpucore", { 'data': [], 'label': [] })
    useEffect(() => {
        console.log('already', clientStatus)
        if (clientStatus.conected) {
            console.log('already : ', clientStatus)
        }
        for (let i = 0; i < cpuSession.data.length; i++) {
            ctdata.push(cpuSession.data[i])
            ctlabes.push(cpuSession.label[i])
        }
        socket.on("allcurrentinfo", (info) => {
            let temper = info.cpu.temperature.toFixed(2)
            if (ctdata.length >= 60) {
                ctlabes.shift()
                ctdata.shift()
            }
            if (ctlabes.slice(-1) != info.time) {
                console.log('ctdata.length : ', ctdata.length, ctlabes.length)
                ctdata.push(Number(temper))
                ctlabes.push(info.time)
                let cdata = cpuSession.data
                let clabel = cpuSession.label
                setCpuSession({
                    'data': ctdata,
                    'label': ctlabes
                })
                if (refchart.current) {
                    console.log("ref : true ")
                    refchart.current.update();
                } else {
                    console.log("refchart : ", refchart.current)
                }
            }
        });
    }, [socket]);

    function limitSize(array, size) {
        while (array.length >= size) {
            array.shift()
        }
        return array
    }
    return (
        <div>
            <Line ref={refchart} data={livedata} options={options} />
        </div>
    )
}


