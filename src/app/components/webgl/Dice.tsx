import * as THREE from 'three'
import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { motion } from "framer-motion-3d"
import { useIntroStore } from '@/app/store/useIntroStore'

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

export function Dice(props: JSX.IntrinsicElements['group']) {
  const { textOrder } = useIntroStore();
  const group = React.useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF("/assets/models/dice.glb") as GLTFResult
  const { actions } = useAnimations(animations, group)

  return (
    <motion.group 
      initial={{ x: 4.5, y: 1.5, z: -1}}
      animate={textOrder === 1 ? { x: 0, y: 2, z: 0, transition: { duration: 0.5}}: {}}
      >
      <group 
        ref={group}
        >
        <mesh castShadow receiveShadow name="DIce" geometry={nodes.DIce.geometry} material={materials.MP_Dice_aiSS} position={[0, 0, 0]} rotation={[-3.141, -0.001, -Math.PI]} scale={0.04} />
      </group>
    </motion.group>
  )
}

useGLTF.preload("/assets/models/dice.glb")
