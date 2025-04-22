// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./Analysis.css";
import data from "../../data.json";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function Analysis({ mode, analysisOption }){
    const [width, setWidth]=useState(window.innerWidth);
    
    useEffect(()=>{
        const handleResize=()=>setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    })

    const chartData=data.elements.map((element)=>({
        number: element.number,
        name: element.name,
        symbol: element.symbol,
        value: element[analysisOption.value]
    }));

    const bg=mode==="day" ? "#F4F7ED" : "#1E2022";
    const text=mode==="day" ? "#1E2022" : "#F4F7ED";
    const textSecondary=mode==="day" ? "#E9ECE3" : "#2C2F31";
    const red="#C94C4C";

    let yAxisLabel=analysisOption.name;
    switch(analysisOption.value){
        case "atomic_mass":
            yAxisLabel+=" - amu"; break;
        case "boil": case "melt":
            yAxisLabel+=" - K"; break;
        case "molar_heat": 
            yAxisLabel+=" - J/(mol K)"; break;
        case "density": 
            yAxisLabel+=" - g/l or g/cubic cm"; break;
        case "electron_affinity":
            yAxisLabel+=" - kJ/mol"; break;
        default: break;
    }

    const tooltipConfig=(payload)=>{
        if(payload && payload.length){
            return(
                <div style={{
                    backgroundColor: text,
                    borderRadius: 4,
                    padding: "12px 16px",
                    color: bg,
                }}>
                    <p>{payload[0].payload.name} <strong style={{ color: red }}>{payload[0].payload.symbol}</strong></p>
                    <p>Atomic Number: <strong style={{ color: red }}>{payload[0].payload.number}</strong></p>
                    <p>{analysisOption.name}: <strong style={{ color: red }}>{payload[0].payload.value}</strong></p>
                </div>
            );
        }
        return null;
    }

    const HorizontalGraph=()=>{
        return(
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 0, bottom: 20, left: 4 }}>
                    <CartesianGrid stroke={textSecondary}/>
                    <XAxis 
                        dataKey="number" 
                        interval={4} 
                        tick={{ fill: text }}
                        label={{
                            value: "Elements",
                            fill: text,
                            fontSize: 20,
                            dy: 24,
                            style: { textAnchor: "middle" }
                        }}
                    />
                    <YAxis 
                        tick={{ fill: text }} 
                        type="number"
                        label={{
                            value: yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                            fill: text,
                            fontSize: 20,
                            style: { textAnchor: "middle" }
                        }}
                    />
                    <Tooltip cursor={false} content={({ payload })=>tooltipConfig(payload)}/>
                    <Line type="monotone" dataKey="value" stroke={red} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }}/>
                </LineChart>
            </ResponsiveContainer> 
        )
    };

    const VerticalGraph=()=>{
        return(
            <ResponsiveContainer width="100%" height="100%">
                <LineChart layout="vertical" data={chartData} margin={{ top: 20, right: 0, bottom: 20, left: 4 }}>
                    <CartesianGrid stroke={textSecondary}/>
                    <YAxis
                        dataKey="number"
                        type="category" 
                        interval={4}
                        tick={{ fill: text }}
                        label={{
                            value: "Elements",
                            angle: -90,
                            position: "insideLeft",
                            fill: text,
                            fontSize: 20,
                            style: { textAnchor: "middle" }
                        }}
                    />
                    <XAxis
                        type="number"
                        tick={{ fill: text }}
                        label={{
                            value: yAxisLabel,
                            fill: text,
                            fontSize: 20,
                            dy: 24,
                            style: { textAnchor: "middle" }
                        }}
                    />
                    <Tooltip cursor={false} content={({ payload })=>tooltipConfig(payload)}/>
                    <Line type="monotone" dataKey="value" stroke={red} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    return(
        <div className="analysis">
            <h1>{analysisOption.name}</h1>
            {width > 580 ? <HorizontalGraph/> : <VerticalGraph/>}
        </div>
    )
};