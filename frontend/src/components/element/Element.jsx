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
        return <span className="box">{parts}</span>;
    }

    return(
        <div className="element">
            <div className="element-header">
                {prevElement ? 
                    <button onClick={()=>navigate(`/element/${number-1}`)}>
                        <img className="prev" src="/prev.png" alt="previous"/>
                        {width<600 ? prevElement.symbol : prevElement.name}
                    </button>
                : <div/>}
                <h1 className="element-name">{element.name} ({element.symbol})</h1>
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
                    <div className="element-first-row">
                        <div className="element-card">
                            <div className="element-card-row">
                                <p>{element.number}</p>
                                <p>{element.phase}</p>
                            </div>
                            <div className="element-card-row1">
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
                    </div>
                    <div className="element-info-card">
                        <h2>Electron Details</h2>
                        {element.shells && 
                            <div className="element-card-div">
                                <p>Shell Config</p>
                                <span className="box">{element.shells?.join(", ")}</span>
                            </div>
                        }
                        {element.electron_configuration && 
                            <div className="element-card-div">
                                <p>Electron Config</p>
                                {renderElectronConfig(element.electron_configuration)}
                            </div>
                        }
                        {element.electron_configuration_semantic && 
                            <div className="element-card-div">
                                <p>Semantic Config</p>
                                {renderElectronConfig(element.electron_configuration_semantic)}
                            </div>
                        }
                        {element.electronegativity_pauling && 
                            <div className="element-card-div">
                                <p>Electronegativity</p>
                                <span className="box">{element.electronegativity_pauling}</span>
                            </div>
                        }
                        {element.electron_affinity && 
                            <div className="element-card-div">
                                <p>Electron Affinity</p>
                                <span className="box">{element.electron_affinity}</span>
                            </div>
                        }
                    </div>
                    <div className="element-info-card">
                        <h2>Discovery</h2>
                        {element.discovered_by && 
                            <div className="element-card-div">
                                <p>Discovered by</p>
                                <span className="box">{element.discovered_by}</span>
                            </div>
                        }
                        {element.named_by && 
                            <div className="element-card-div">
                                <p>Named by</p>
                                <span className="box">{element.named_by}</span>
                            </div>
                        }
                        {element.source && <a href={element.source} target="_blank" rel="noreferrer">More Info</a>}
                    </div>
                    <div className="element-info-card">
                        <h2>Structure</h2>
                        {element.atomic_mass && 
                            <div className="element-card-div">
                                <p>Atomic Mass</p>
                                <span className="box">{element.atomic_mass}</span>
                            </div>
                        }
                        {element.boil && 
                            <div className="element-card-div">
                                <p>Boiling Point</p>
                                <span className="box">{element.boil}</span>
                            </div>
                        }
                        {element.melt && 
                            <div className="element-card-div">
                                <p>Melting Point</p>
                                <span className="box">{element.melt}</span>
                            </div>
                        }
                        {element.density && 
                            <div className="element-card-div">
                                <p>Density</p>
                                <span className="box">{element.density}</span>
                            </div>
                        }
                        {element.molar_heat && 
                            <div className="element-card-div">
                                <p>Molar Heat</p>
                                <span className="box">{element.molar_heat}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
