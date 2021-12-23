import { Bar } from "react-chartjs-2";
import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { SocketContext, SOCKET_ACTION } from "../services/SocketContext";
import { useSessionStorage } from "../services/StorageHook";




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

export const ChartData = () => {

    console.log("chartdat")
    const refchart = useRef()
    const { socket, cpuDispatch } = useContext(SocketContext)
    const [clientStatus, setClientStatus] = useSessionStorage("socket_status", "")

    useEffect(() => {
        console.log('run chart')
        //console.log("tes : ", socket,cpuDispatch)

        cpuDispatch(SOCKET_ACTION.EMIT)
        if (clientStatus.conected) {
            console.log('already')
        }
        socket.on("allcurrentinfo", (info) => {
            console.log("tes : ", info.time)
            let temper = info.cpu.temperature.toFixed(2)
            if (ctdata.length >= 60) {
                ctlabes.shift()
                ctdata.shift()
            }

            if (ctlabes.slice(-1) != info.time) {
                ctdata.push(Number(temper))
                ctlabes.push(info.time)
            }

            //refchart.current.data.datasets[0].data.push(Number(temper))
            //refchart.current.data.labels.push(temper)
            //console.log(refchart.current.data.datasets[0].data)


            // const lineChart = refchart.current
            // if (lineChart != "") {
            //     if (lineChart != null) {

            //         lineChart.update();
            //     }

            // } else {
            //     console.log("linechat is null : ", lineChart)
            // }


            //let lineChart = refchart.current

            setTimeout(() => {

            }, 200);
            if (refchart.current) {
                refchart.current.update();
            }


        });
    }, []);

    return (
        <div>
            <Bar ref={refchart} data={livedata} options={options} />
        </div>
    )
}


