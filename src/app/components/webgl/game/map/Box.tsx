import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_32: THREE.Mesh
  }
  materials: {
    ['Material.014']: THREE.MeshStandardMaterial
  }
}

export function Box(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/box.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh receiveShadow castShadow scale={0.5} geometry={nodes.Object_32.geometry} material={materials['Material.014']} position={[0, 0.5, 0]} />
    </group>
  )
}

useGLTF.preload('/assets/models/box.glb')
