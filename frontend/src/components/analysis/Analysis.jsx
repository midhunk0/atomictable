// @ts-nocheck
import React from "react";
import "./Analysis.css";
import data from "../../data.json";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function Analysis({ mode, analysisOption }){
    const labels=data.elements.map(element=>element.symbol);
    const values=data.elements.map(element=>element[analysisOption.value]);
    const bg=mode==="day" ? "#F4F7ED" : "#1E2022";
    const text=mode==="day" ? "#1E2022" : "#F4F7ED";
    const textSecondary=mode==="day" ? "#E9ECE3" : "#2C2F31";
    const red="#C94C4C";
    // const blue="#3A7CA5";
    // const green="#6A994E";
    // const yellow="#E3B505"; 

    const chartData={
        labels,
        datasets: [{
            label: analysisOption.name,
            data: values,
            fill: false,
            borderColor: red,
            backgroundColor: text,
            tension: 0.2,
            pointRadius: 3,
            // snapGaps: true
        }]
    };

    const options={
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: text
                },
            },
            tooltip: {
                backgroundColor: text,
                titleColor: bg,
                bodyColor: bg,
                cornerRadius: 4,
                displayColors: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: text,
                    maxRotation: 90,
                    minRotation: 45
                },
                grid: {
                    color: textSecondary,
                }
            },
            y: {
                title: {
                    display: true,
                    color: text,
                    text: analysisOption.name
                },
                ticks: {
                    color: text,
                },
                grid: {
                    color: textSecondary,
                    lineHeight: 1
                }
            }
        }
    }

    return(
        <div className="analysis">
            <h1>{analysisOption.name}</h1>
            <Line data={chartData} options={options}/>
        </div>
    )
};