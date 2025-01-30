import { Html } from "@react-three/drei"
import { Vector3Tuple } from "three"
import { motion } from "motion/react";

interface IBadge {
    position: Vector3Tuple;
    color?: string;
    text:string;
    delay?: number;
}

function Badge({position, text, color = "rgb(246, 230, 0)", delay = 0}:IBadge) {
    return (
        <Html center position={[position[0], position[1] - 0.8,position[2]]}>
            <motion.div 
                initial={{y: 5, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{ duration: 0.5, delay: delay}}
                className="badge-npc-name"
                style={{ background: color}}
                >{text}</motion.div>
        </Html>
    )
}

export default Badge