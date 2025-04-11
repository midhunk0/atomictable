import React from "react";
import "./Table.css";
import data from "../../data.json";

export default function Table(){
    const elements=data.elements;

    return(
        <div className="table">
            {Array.from({ length: 10 }, (_, rowIndex)=>(
                <div className="row" key={rowIndex}>
                {Array.from({ length: 18 }, (_, colIndex)=>{
                    const element=elements.find((element)=>element.ypos-1===rowIndex && element.xpos-1===colIndex);
                    return(
                        <div className={`element ${element?.block}`} key={colIndex}>
                            {element ? element.symbol : ""}
                        </div>
                    )
                })}
                </div>
            ))}
        </div>
    )
}