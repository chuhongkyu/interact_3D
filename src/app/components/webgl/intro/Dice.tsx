import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { motion } from "framer-motion-3d"
import { useIntroStore } from '@/app/store/useIntroStore'
import { diceAnimation } from '@/app/utils/diceRotate'
import { useQueryDataStore } from '@/app/store/useQueryData'
import { usePlayerStore } from '@/app/store/usePlayerStore'

type ActionName = 'idle' | 'rotate'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    DIce: THREE.Mesh
  }
  materials: {
    MP_Dice_aiSS: THREE.MeshBasicMaterial
  }
  animations: GLTFAction[]
}

const resetAnimation = { 
  x: 4.5, y: 1.5, z: -1,
  transition: {
    duration: 1,
    delay: 2,
  }
}

export function Dice() {
  const { isDiceStart, diceNumber } = useIntroStore();
  const [ active, setActive ] = useState(false);
  const { nodes, materials } = useGLTF("/assets/models/dice.glb") as GLTFResult
  const { userData } = usePlayerStore();
  
  useEffect(()=>{
    if(userData.career){
      setActive(true);
    }
  },[userData])

  return (
    <motion.group 
      initial={{ x: 4.5, y: 1.5, z: -1}}
      animate={ isDiceStart ? active ? resetAnimation : { x: 0, y: 2, z: 0, transition: { duration: 0.5 }} : {}}
      >
      <motion.group 
        initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
        animate={diceAnimation[diceNumber-1]}
        >
          <Center>
            <motion.mesh 
              initial={{scale: 0.04}}
              animate={
                active
                  ? {
                      scale: [0.04, 0.06, 0.05, 0.04],
                      y: [0, 0.5, 0.25, 0],
                      transition: {
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeInOut",
                        times: [0, 0.3, 0.7, 1],
                      },
                    }
                  : {
                      scale: 0.04,
                      y: 0,
                    }
              }
              castShadow 
              receiveShadow 
              name="Dice" 
              geometry={nodes.DIce.geometry}
              material={materials.MP_Dice_aiSS} 
              position={[0, 0, 0]} 
              rotation={[0, 0, 0]} 
              scale={0.04} 
            />
          </Center>
      </motion.group>
    </motion.group>
  )
}

useGLTF.preload("/assets/models/dice.glb")
