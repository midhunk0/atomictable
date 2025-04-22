// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./Element.css";
import data from "../../data.json";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Element() {
    const navigate=useNavigate();
    const number=Number(useParams().number);
    const prevElement=data.elements[number-2];
    const element=data.elements[number-1];
    const nextElement=data.elements[number];
    const [width, setWidth]=useState(window.innerWidth);
    const [copied, setCopied]=useState(null);

    useEffect(()=>{
        const handleResize=()=>setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);

    function renderElectronConfig(config){
        const parts=config.split(' ').map((part, index)=>{
            const match=part.match(/^(\d)([spdf])(\d+)$/);
            if(match){
                const [, n, l, p]=match;
                return(
                    <span key={index}>
                        {n}{l}<sup>{p}</sup>&nbsp;
                    </span>
                );
            }
            return <span key={index}>{part}&nbsp;</span>;
        });
        return <span>{parts}</span>;
    }

    const speakText=(text)=>{
        const synth=window.speechSynthesis;
        const utterence=new SpeechSynthesisUtterance(text);
        utterence.lang="en-us";
        utterence.rate=1;
        utterence.pitch=1;
        synth.speak(utterence);
    };

    const handleCopy=(text, fieldId)=>{
        navigator.clipboard.writeText(text)
        .then(()=>{
            toast.success("Copied to clipboard");
            setCopied(fieldId);
            setTimeout(()=>setCopied(null), 1500);
        })
        .catch((err)=>console.error(err));
    }

    const PropertyBox=({ property, name })=>{
        return(element[property] && 
            <div className="element-card-div">
                <p>{name}</p>
                <span className="element-property-box">
                    {element[property]}
                    <button onClick={()=>handleCopy(element[property], property)}>
                        <img 
                            className={`icon ${copied===property ? "check" : "copy"}`} 
                            src={copied===property ? "/check.png" : "/copy.png"} 
                            alt={copied===property ? "check" : "copy"}
                        />
                    </button>
                </span>
            </div>
        )
    }

    const Configuration=({ config, name })=>{
        return(element[config] && 
            <div className="element-card-div">
                <p>{name}</p>
                <span className="element-property-box">
                    {renderElectronConfig(element[config])}
                    <button onClick={()=>handleCopy(element[config], config)}>
                        <img 
                            className={`icon ${copied===config ? "check" : "copy"}`} 
                            src={copied===config ? "/check.png" : "/copy.png"} 
                            alt={copied===config ? "check" : "copy"}
                        />
                    </button>
                </span>
            </div>
        )
    }

    const ShellConfiguration=()=>{
        return(element.shells && 
            <div className="element-card-div">
                <p>Shell Config</p>
                <span className="element-property-box">
                    {element.shells?.join(", ")}
                    <button onClick={()=>handleCopy(element.shells?.join(", "), "shell")}>
                        <img 
                            className={`icon ${copied==="shell" ? "check" : "copy"}`} 
                            src={copied==="shell" ? "/check.png" : "/copy.png"} 
                            alt="copy"
                        />
                    </button>
                </span>
            </div>
        )
    }

    return(
        <div className="element">
            <div className="element-header">
                {prevElement ? 
                    <button onClick={()=>navigate(`/element/${number-1}`)}>
                        <img className="icon prev" src="/prev.png" alt="previous"/>
                        {width<600 ? prevElement.symbol : prevElement.name}
                    </button>
                : <div/>}
                <h1>{element.name} ({element.symbol})</h1>
                {nextElement ? 
                    <button onClick={()=>navigate(`/element/${number+1}`)}>
                        {width<600 ? nextElement.symbol : nextElement.name}
                        <img className="icon next" src="/next.png" alt="next"/>
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
                    <div className="element-first-row">
                        <div className="element-card">
                            <div className="element-card-row">
                                <p>{element.number}</p>
                                <p>{element.phase}</p>
                            </div>
                            <div className="element-card-middle-row">
                                <p className="symbol">{element.symbol}</p>
                                <p>{element.name}</p>
                            </div>
                            <div className="element-card-row">
                                <p className="category">{element.category}</p>
                                <p className={`block ${element.block}`}>{element.block}</p>
                            </div>
                        </div>
                        <div className="element-image-section">
                            <img src={element.image.url} alt={element.name} />
                            <p>{element.image.title}</p>
                        </div>
                    </div>
                    <div className="element-summary">
                        <h2>Details</h2>
                        <p>{element.summary}</p>
                        <div className="element-summary-buttons">
                            <button onClick={()=>speakText(element.summary)}>
                                <img className="icon audio" src="/audio.png" alt="audio"/>
                            </button>
                            <button onClick={()=>handleCopy(element.summary, "summary")}>
                                <img 
                                    className={`icon ${copied==="summary" ? "check" : "copy"}`} 
                                    src={copied==="summary" ? "/check.png" : "/copy.png"} 
                                    alt="copy"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="element-info-card">
                        <h2>Electron Details</h2>
                        <ShellConfiguration/>
                        <Configuration config="electron_configuration" name="Electronic Config"/>
                        <Configuration config="electron_configuration_semantic" name="Semantic Config"/>
                        <PropertyBox property="electronegativity_pauling" name="Electronegativity"/>
                        <PropertyBox property="electron_affinity" name="Electron Affinity"/>
                    </div>
                    <div className="element-info-card">
                        <h2>Discovery</h2>
                        <PropertyBox property="discovered_by" name="Discovered by"/>
                        <PropertyBox property="named_by" name="Named by"/>
                        {element.source && <a href={element.source} target="_blank" rel="noreferrer">More Info</a>}
                    </div>
                    <div className="element-info-card">
                        <h2>Structure</h2>
                        <PropertyBox property="atomic_mass" name="Atomic Mass"/>
                        <PropertyBox property="boil" name="Boiling Point"/>
                        <PropertyBox property="melt" name="Melting Point"/>
                        <PropertyBox property="density" name="Density"/>
                        <PropertyBox property="molar_heat" name="Molar Heat"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
