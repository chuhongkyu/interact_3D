import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { motion } from "framer-motion-3d"
import { useIntroStore } from '@/app/store/useIntroStore'
import { diceAnimation } from '@/app/utils/diceRotate'

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

export function Dice() {
  const { textOrder, diceNumber } = useIntroStore();
  const { nodes, materials } = useGLTF("/assets/models/dice.glb") as GLTFResult

  return (
    <motion.group 
      initial={{ x: 4.5, y: 1.5, z: -1}}
      animate={textOrder === 1 ? { x: 0, y: 2, z: 0, transition: { duration: 0.5}}: {}}
      >
      <motion.group 
        initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
        animate={diceAnimation[diceNumber-1]}
        >
          <Center>
            <motion.mesh 
              castShadow 
              receiveShadow name="Dice" 
              geometry={nodes.DIce.geometry} material={materials.MP_Dice_aiSS} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.04} />
          </Center>
      </motion.group>
    </motion.group>
  )
}

useGLTF.preload("/assets/models/dice.glb")
