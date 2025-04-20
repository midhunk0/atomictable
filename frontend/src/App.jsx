import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Element from "./components/element/Element";
import Topbar from "./components/topbar/Topbar";
import { ToastContainer } from "react-toastify";
import Analysis from "./components/analysis/Analysis";

function App(){
    const [mode, setMode]=useState(localStorage.getItem("mode") || "day");
    const [element, setElement]=useState(null);
    const [filterOption, setFilterOption]=useState(()=>{
        const option=localStorage.getItem("filterOption");
        return option ? JSON.parse(option) : {value: "all",name: "All Elements"}
    });
    const [analysisOption, setAnalysisOption]=useState(()=>{
        const option=localStorage.getItem("analysisOption");
        return option ? JSON.parse(option) : {value: "atomic_mass",name: "Atomic mass"}
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
        
        const option1=localStorage.getItem("filterOption");
        if(option1){
            setFilterOption(JSON.parse(option1));
        }

        const option2=localStorage.getItem("analysisOption");
        if(option2){
            setAnalysisOption(JSON.parse(option2));
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem("mode", mode);
    }, [mode]);

    useEffect(()=>{
        localStorage.setItem("filterOption", JSON.stringify(filterOption));
    }, [filterOption]);

    useEffect(()=>{
        localStorage.setItem("analysisOption", JSON.stringify(analysisOption));
    }, [analysisOption]);

    return (
        <div className={`app ${mode}`}>
            <Router>
                <Topbar mode={mode} setMode={setMode} setFilterOption={setFilterOption} setAnalysisOption={setAnalysisOption} setElement={setElement}/>
                <Routes>
                    <Route path="/" element={<Table filterOption={filterOption} selectedElement={element}/>}/>
                    <Route path="/element/:number" element={<Element/>}/>
                    <Route path="/analysis" element={<Analysis mode={mode} analysisOption={analysisOption}/>}/>
                </Routes>
            </Router>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={`${mode==="day" ? "light" : "dark"}`}
                toastClassName="toast"
            />
        </div>
    )
}

export default App;
