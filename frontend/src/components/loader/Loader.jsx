/* eslint-disable no-unused-vars */
import React from "react";
import "./Loader.css";
import { motion } from "framer-motion";

export default function Loader(){
    return(
        <motion.div
            className="loader"
            initial={{ scale: 1.5, opacity: 1 }}
            transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <motion.img
                src="/logo.png"
                alt="logo"
                layoutId="logo"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, rotate: [0, 360] }}
                transition={{ duration: 1 }}
            />
        </motion.div>
    )
}