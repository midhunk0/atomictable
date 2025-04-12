/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Topbar({ mode, setMode }){
    const navigate=useNavigate();

    return(
        <div className="topbar">
            <motion.img 
                src="/logo.png" 
                alt="logo" 
                layoutId="logo" 
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                }}
                className="logo"
                onClick={()=>navigate("/")}
            />
            <h1 onClick={()=>navigate("/")}>Periodic Table</h1>
            {mode==="day" ?
                <img className="icon" src="/day.png" alt="day" onClick={()=>setMode("night")}/>
            :
                <img className="icon" src="/night.png" alt="night" onClick={()=>setMode("day")}/>
            }
        </div>
    )
}