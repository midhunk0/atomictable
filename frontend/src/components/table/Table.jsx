/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Table.css";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

export default function Table({ filterOption, selectedElement }){
    const navigate=useNavigate();
    const elements=data.elements;
    
    const [showElements, setShowElements]=useState(elements);
    const [loading, setLoading]=useState(true);
    const [hover, setHover]=useState("");

    useEffect(()=>{
        const timer=setTimeout(()=>setLoading(false), 2000);
        return ()=>clearTimeout(timer);
    }, []);

    useEffect(()=>{
        let filtered=elements;
    
        if(filterOption.value!=="all"){
            filtered=elements.filter((element)=>
                element.block===filterOption.value ||
                element.phase===filterOption.value ||
                element.category===filterOption.value
            );
        }
    
        if(selectedElement){
            filtered=filtered.filter((element)=>
                element.name.toLowerCase().includes(selectedElement.toLowerCase()) ||
                element.symbol.toLowerCase().includes(selectedElement.toLowerCase())
            );
        }
    
        setShowElements(filtered);
    }, [filterOption, selectedElement]);
    
    
    if(loading) return <Loader/>

    return(
        <div className="table">
            <h1>{filterOption.name}</h1>
            <div className="table-container">
            {Array.from({ length: 10 }, (_, rowIndex)=>(
                <div className="table-row" key={rowIndex}>
                {Array.from({ length: 18 }, (_, colIndex)=>{
                    const element=elements.find((element)=>element.ypos-1===rowIndex && element.xpos-1===colIndex);
                    if(rowIndex===5 && colIndex===2){
                        return(
                            <div className="table-element" onMouseEnter={()=>setHover("lanthanide")} onMouseLeave={()=>setHover("")} key={colIndex}>
                                <p className="table-element-number">57-71</p>
                            </div>
                        )
                    }
                    if(rowIndex===6 && colIndex===2){
                        return(
                            <div className="table-element" onMouseEnter={()=>setHover("actinide")} onMouseLeave={()=>setHover("")} key={colIndex}>
                                <p className="table-element-number">89-103</p>
                            </div>
                        )
                    }
                    return(
                        <div 
                            className={`table-element 
                                ${element?.block} 
                                ${hover===element?.category ? "hover" : ""} 
                                ${showElements.find((showElement)=>showElement?.number===element?.number) ? "active" : ""}
                                ${selectedElement && element?.name.toLowerCase().includes(selectedElement) ? "active" : ""}
                            `} 
                            key={colIndex} 
                            onClick={()=>element && navigate(`/element/${element?.number}`)}
                        >
                            <p className="table-element-number">{element?.number}</p>
                            <p className="table-element-symbol">{element?.symbol}</p>
                        </div>
                    )
                })}
                </div>
            ))}
            </div>
        </div>
    )
}