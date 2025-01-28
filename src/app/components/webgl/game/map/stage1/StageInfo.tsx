
import { Html } from "@react-three/drei"
import React from "react"
import { motion } from "motion/react"

function StageInfo() {
    return (
        <Html center>
            <motion.div 
                initial={{y: -2}}
                animate={{y: 0}}
                className="info-wrapper">Complete</motion.div>
        </Html>
    )
}

export default StageInfo