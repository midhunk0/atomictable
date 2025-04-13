// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./Element.css";
import data from "../../data.json";
import { useParams, useNavigate } from "react-router-dom";

export default function Element() {
    const navigate=useNavigate();
    const number=Number(useParams().number);
    const prevElement=data.elements[number-2];
    const element=data.elements[number-1];
    const nextElement=data.elements[number];
    const [width, setWidth]=useState(window.innerWidth);

    useEffect(()=>{
        const handleResize=()=>setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="element">
            <div className="element-header">
                {prevElement ? 
                    <button onClick={()=>navigate(`/element/${number-1}`)}>
                        <img className="prev" src="/prev.png" alt="previous"/>
                        {width<600 ? prevElement.symbol : prevElement.name}
                    </button>
                : <div/>}
                <p className="element-name">{element.name} ({element.symbol})</p>
                {nextElement ? 
                    <button onClick={()=>navigate(`/element/${number+1}`)}>
                        {width<600 ? nextElement.symbol : nextElement.name}
                        <img className="next" src="/next.png" alt="next"/>
                    </button>
                : <div/>}
            </div>
        <div className="element-container">
            <model-viewer
                alt={element.name}
                src={element.bohr_model_3d}
                camera-controls
                ar
                auto-rotate
                shadow-intensity="1"
                exposure="1"
            ></model-viewer>

            <div className="element-info-panel">
                <div className="element-sections">
                    <div className="element-info-card">
                        <h2>General</h2>
                        <p>Number: {element.number}</p>
                        <p>Category: {element.category}</p>
                        <p>Phase: {element.phase}</p>
                        <p>Block: {element.block}</p>
                    </div>
                    <div className="element-info-card">
                        <h2>Discovery</h2>
                        <p>Discovered by: {element.discovered_by}</p>
                        <p>Named by: {element.named_by}</p>
                        <a href={element.source} target="_blank" rel="noreferrer">Wiki</a>
                    </div>
                    <div className="element-info-card">
                        <h2>Structure</h2>
                        <p>Atomic Mass: {element.atomic_mass}</p>
                        <p>Boiling Point: {element.boil}</p>
                        <p>Melting Point: {element.melt}</p>
                        <p>Density: {element.density}</p>
                        <p>Molar Heat: {element.molar_heat}</p>
                    </div>
                    <div className="element-info-card">
                        <h2>Electron Details</h2>
                        <p>Electron Affinity: {element.electron_affinity}</p>
                        <p>Electronegativity: {element.electronegativity_pauling}</p>
                        <p>Shells: {element.shells?.join(", ")}</p>
                        <p>Electron Config: {element.electron_configuration}</p>
                        <p>Semantic Config: {element.electron_configuration_semantic}</p>
                    </div>
                </div>
                <div className="element-summary">
                    <h2>Summary</h2>
                    <p>{element.summary}</p>
                </div>
                <div className="element-image-section">
                    <h2>{element.image.title}</h2>
                    <img src={element.image.url} alt={element.name} />
                </div>
            </div>
        </div>
        </div>
    );
}
