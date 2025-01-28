import { Html } from "@react-three/drei"
import { Vector3Tuple } from "three"
import { motion } from "motion/react";

function Badge({position, text}:{position: Vector3Tuple, text:string}) {
    return (
        <Html center position={[position[0], position[1] - 0.5,position[2]]}>
            <motion.div 
                initial={{y: -2}}
                animate={{y: 0}}
                className="badge-npc-name"
                >{text}</motion.div>
        </Html>
    )
}

export default Badge