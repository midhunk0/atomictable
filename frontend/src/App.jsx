import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Element from "./components/element/Element";
import Topbar from "./components/topbar/Topbar";

function App() {
    const [mode, setMode]=useState(localStorage.getItem("mode") || "day");

    useEffect(()=>{
        const savedMode=localStorage.getItem("mode");
        if(savedMode){
            setMode(savedMode);
        }
        else{
            const prefersDark=window.matchMedia("(prefers-color-scheme: dark)");
            setMode(prefersDark ? "night" : "dark");
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem("mode", mode);
    }, [mode]);

    return (
        <div className={`app ${mode}`}>
        <Router>
            <Topbar mode={mode} setMode={setMode}/>
            <Routes>
                <Route path="/" element={<Table/>}/>
                <Route path="/element/:number" element={<Element/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;
