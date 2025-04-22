import React, { useEffect, useRef, useState } from "react";
import "./Topbar.css";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Topbar({ mode, setMode, setFilterOption, setAnalysisOption, setElement }){
    const navigate=useNavigate();
    const location=useLocation();
    const inputRef=useRef(null);
    const current=location.pathname;
    
    const [open, setOpen]=useState(false);
    const [searchbar, setSearchbar]=useState(false);

    useEffect(()=>{
        if(searchbar && inputRef.current){
            // @ts-ignore
            inputRef.current.focus();
        }
    }, [searchbar]);

    const filterOptions=[
        { value: "all", name: "All Elements" },
        { value: "s", name: "s-Block Elements" },
        { value: "p", name: "p-Block Elements" },
        { value: "d", name: "d-Block Elements" },
        { value: "f", name: "f-Block Elements" },
        { value: "Solid", name: "Solid" },
        { value: "Liquid", name: "Liquid" },
        { value: "Gas", name: "Gas" },
        { value: "alkali metal", name: "Alkali Metals" },
        { value: "alkaline earth metal", name: "Alkaline Earth Metals" },
        { value: "metalloid", name: "Metalloids" },
        { value: "polyatomic nonmetal", name: "Polyatomic Nonmetals" },
        { value: "post-transition metal", name: "Post-Transition Metals" },
        { value: "noble gas", name: "Noble Gases" },
        { value: "diatomic nonmetal", name: "Diatomic Nonmetals" },
        { value: "transition metal", name: "Transition Metals" },
        { value: "lanthanide", name: "Lanthanides" },
        { value: "actinide", name: "Actinides" },
    ];

    const analysisOptions=[
        { value: "electronegativity_pauling", name: "Electronegativity" },
        { value: "electron_affinity", name: "Electron Affinity" },
        { value: "atomic_mass", name: "Atomic mass" },
        { value: "boil", name: "Boiling point" },
        { value: "melt", name: "Melting point" },
        { value: "density", name: "Density" },
        { value: "molar_heat", name: "Molar heat" },
    ]

    return(
        <div className="topbar">
            <motion.img
                src="/logo.png"
                alt="logo"
                layoutId="logo"
                transition={{ type: "spring", stiffness: 50, damping: 20, }}
                className="logo"
                onClick={()=>navigate("/")}
            />
            <h2 onClick={()=>navigate("/")}>Atomic Table</h2>
            <div className="topbar-buttons">
                {current==="/" && 
                    <div className="topbar-search">
                        {searchbar && 
                            <input ref={inputRef} type="text" placeholder="enter an element" onChange={(e)=>setElement(e.target.value.toLowerCase())}/>
                        }
                        <img className="icon search" src="/search.png" alt="search" onClick={()=>{setSearchbar(prev=>!prev), setElement()}}/>
                    </div>
                }
                {mode==="day" ? 
                    <img className="icon" src="/day.png" alt="day" onClick={()=>setMode("night")}/>
                :
                    <img className="icon" src="/night.png" alt="night" onClick={()=>setMode("day")}/>
                }
                {current!=="/analysis" && 
                    <img src="/graph.png" alt="graph" className="icon graph" onClick={()=>navigate("/analysis")}/>
                }
                {current==="/" && 
                    <div className="topbar-menu">
                        <img
                            className={`icon ${open ? "close" : "menu"}`}
                            src={`${open ? "/close.png" : "/menu.png"}`}
                            alt="menu"
                            onClick={()=>setOpen((prev)=>!prev)}
                        />
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    className="topbar-options"
                                    initial={{ scale: 0, opacity: 0, originX: 1, originY: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                                >
                                    {filterOptions.map((option, index)=>(
                                        <p key={index} onClick={()=>{setFilterOption(option); setOpen(false)}}>
                                            {option.name}
                                        </p>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                }
                {current==="/analysis" && 
                    <div className="topbar-menu">
                        <img
                            className={`icon ${open ? "close" : "menu"}`}
                            src={`${open ? "/close.png" : "/menu.png"}`}
                            alt="menu"
                            onClick={()=>setOpen((prev)=>!prev)}
                        />
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    className="topbar-options"
                                    initial={{ scale: 0, opacity: 0, originX: 1, originY: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                                >
                                    {analysisOptions.map((option, index)=>(
                                        <p key={index} onClick={()=>{setAnalysisOption(option); setOpen(false)}}>
                                            {option.name}
                                        </p>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                }
            </div>
        </div>
    );
}
