import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Element from "./components/element/Element";
import Topbar from "./components/topbar/Topbar";

function App(){
    const [mode, setMode]=useState(localStorage.getItem("mode") || "day");
    const [option, setOption]=useState(()=>{
        const storedOption=localStorage.getItem("option");
        return storedOption ? JSON.parse(storedOption) : {value: "all",name: "All Elements"}
    });

    useEffect(()=>{
        const savedMode=localStorage.getItem("mode");
        if(savedMode){
            setMode(savedMode);
        }
        else{
            const prefersDark=window.matchMedia("(prefers-color-scheme: dark)");
            setMode(prefersDark ? "night" : "dark");
        }
        
        const storedOption=localStorage.getItem("option");
        if(storedOption){
            setOption(JSON.parse(storedOption));
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem("mode", mode);
    }, [mode]);

    useEffect(()=>{
        localStorage.setItem("option", JSON.stringify(option));
    }, [option]);

    return (
        <div className={`app ${mode}`}>
        <Router>
            <Topbar mode={mode} setMode={setMode} option={option} setOption={setOption}/>
            <Routes>
                <Route path="/" element={<Table option={option}/>}/>
                <Route path="/element/:number" element={<Element/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;
