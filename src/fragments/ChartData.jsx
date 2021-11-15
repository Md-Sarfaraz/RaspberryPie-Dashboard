import { Line } from "react-chartjs-2";
import React, { useEffect, useRef } from 'react'
import { io } from "socket.io-client";

const socket = io("http://192.168.100.125:9080")

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

    const refchart = useRef()


    useEffect(() => {
        console.log(" first  Test")
        socket.on("allcurrentinfo", (cpu) => {
            let temper
            temper = cpu.temperature.toFixed(2)
            if (ctdata.length >= 100) {
                ctlabes.shift()
                ctdata.shift()
            }
            ctdata.push(Number(temper))
            ctlabes.push(temper)
            //refchart.current.data.datasets[0].data.push(Number(temper))
            //refchart.current.data.labels.push(temper)
            //console.log(refchart.current.data.datasets[0].data)
            let lineChart = refchart.current
            lineChart.update();

        });
    }, []);


    return (
        <div>
            <Line data={livedata} ref={refchart} options={options} />
        </div>
    )
}


