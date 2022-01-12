import { Line } from "react-chartjs-2";
import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { SocketContext, SOCKET_ACTION } from "../services/SocketContext";
import { useLocalStorage, useSessionStorage } from "../services/StorageHook";


let ctdata = []
let ct1 = []
let ct2 = []
let ct3 = []
let ct4 = []

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
                label: 'Core 1',
                data: ct1,
                fill: false,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 123, 255)',
                tension: 0.3
            },
            {
                label: 'Core 2',
                data: ct2,
                fill: false,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 57, 191)',
                tension: 0.3
            },
            {
                label: 'Core 3',
                data: ct3,
                fill: false,
                backgroundColor: gradient,
                borderColor: 'rgba(77, 7, 181)',
                tension: 0.3
            },
            {
                label: 'Core 4',
                data: ct4,
                fill: false,
                backgroundColor: gradient,
                borderColor: 'rgba(138, 7, 181)',
                tension: 0.3
            },
        ],
    }
};

const options = {
    pointStyle: 'line',
    hitRadius: 30,
    scales: {
        y: {
            type: 'linear',
            min: 0,
            max: 100,
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
    const [cpuSession, setCpuSession] = useSessionStorage("cpucore", { 'data': [[0], [0], [0], [0]], 'label': [] })
    useEffect(() => {
        if (clientStatus.conected) {
            console.log('already Connected : ', clientStatus)
        }
        console.log(cpuSession.data.length)
        for (let i = 0; i < cpuSession.data[0].length; i++) {
            ct1.push(cpuSession.data[0][i])
            ct2.push(cpuSession.data[1][i])
            ct3.push(cpuSession.data[2][i])
            ct4.push(cpuSession.data[3][i])
            ctlabes.push(cpuSession.label[i])
        }
        socket.on("allcurrentinfo", (info) => {
            let temper = info.cpu.temperature.toFixed(2)
            if (ctdata.length >= 60) {
                ctlabes.shift()
                ct1.shift()
                ct2.shift()
                ct3.shift()
                ct4.shift()
            }
            if (ctlabes.slice(-1) != info.time) {
                ct1.push(info.cpu.cpu_percent[0])
                ct2.push(info.cpu.cpu_percent[1])
                ct3.push(info.cpu.cpu_percent[2])
                ct4.push(info.cpu.cpu_percent[3])
                ctlabes.push(info.time)
                // console.log(info.cpu.cpu_percent)

                setCpuSession({
                    'data': [limitSize(ct1, 60), limitSize(ct2, 60), limitSize(ct3, 60), limitSize(ct4, 60)],
                    'label': ctlabes
                })
                if (refchart.current) {
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


