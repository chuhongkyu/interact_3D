import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { motion } from "framer-motion-3d"
import { useGameStore } from '@/app/store/useGameStore'

type GLTFResult = GLTF & {
  nodes: {
    Object_20: THREE.Mesh
  }
  materials: {
    ['Material.007']: THREE.MeshStandardMaterial
  }
}

export function Hole(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/hole.glb') as GLTFResult;
  const setPlayerState = useGameStore((state)=> state.setPlayerState);
  return (
    <group {...props} dispose={null}>
      <motion.group 
        initial={{y: 0}}
        animate={{y: -2, transition: { duration: 0.5, delay: 2}}}
        onAnimationComplete={()=> setPlayerState("DEFAULT")}
        scale={0.68}>
        <mesh receiveShadow castShadow geometry={nodes.Object_20.geometry} material={materials['Material.007']} position={[0, -0.069, 4]} />
      </motion.group>
    </group>
  )
}

useGLTF.preload('/assets/models/hole.glb')
