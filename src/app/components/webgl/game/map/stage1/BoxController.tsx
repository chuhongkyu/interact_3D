import { stage1 } from "@/app/utils/gameData";
import { motion } from "framer-motion-3d"
import StageInfo from "./StageInfo";

function BoxController({active, number}: {active: boolean, number: number}) {
  return (
    <>
      {active && <StageInfo/>}
      {stage1.problem[number].map((el,i)=>{
        return(
          <motion.mesh 
            key={i + "BOX-EXAMPLE-DUMMY-UI"} 
            visible={el.active} 
            position={[el.position[0], 0, el.position[2]]}
            initial={{scale: 1}}
            animate={active ? {scale: 1.1}: {scale: 1}}
          >
            <boxGeometry args={[1,1,1]}/>
            <motion.meshBasicMaterial 
              initial={{opacity: 0}}
              animate={active ? {opacity: 0.4 }: {opacity: [0,0.4,0,0.4,0]}}
              transition={active ? {duration: 1 } : {duration: 2, delay: 1}}
              depthTest={false} 
              transparent 
              opacity={0.6} 
              color={active ? "#02fe6f" : "#fe028d"}/>
          </motion.mesh>
        )
      })}
    </>
  )
}

export default BoxController