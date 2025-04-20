// @ts-nocheck
import React from "react";
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
    // const blue="#3A7CA5";
    // const green="#6A994E";
    // const yellow="#E3B505"; 

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

    return(
        <div className="analysis">
            <h1>{analysisOption.name}</h1>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
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
                        label={{
                            value: yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                            fill: text,
                            fontSize: 20,
                            style: { textAnchor: "middle" }
                        }}
                    />
                    <Tooltip
                        cursor={false}
                        content={({ payload })=>{
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
                        }}
                    />
                    <Line type="monotone" dataKey="value" stroke={red} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 4 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};