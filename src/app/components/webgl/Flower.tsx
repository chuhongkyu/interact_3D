import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
    defaultMaterial_1: THREE.Mesh
    defaultMaterial_2: THREE.Mesh
    defaultMaterial_3: THREE.Mesh
    defaultMaterial_4: THREE.Mesh
    defaultMaterial_5: THREE.Mesh
  }
  materials: {
    ['07___Default']: THREE.MeshStandardMaterial
    ['08___Default']: THREE.MeshStandardMaterial
    ['09___Default']: THREE.MeshStandardMaterial
    ['01___Default']: THREE.MeshStandardMaterial
    ['02___Default']: THREE.MeshStandardMaterial
    ['03___Default']: THREE.MeshStandardMaterial
  }
}

export function Flower() {
  const { nodes, materials } = useGLTF("/assets/models/flower.glb") as GLTFResult
  return (
    <group rotation={[1,0,0.2]} dispose={null}>
      <group rotation={[0,Math.PI/2,0]} position={[-0.35, 0.5, -0.38]} scale={0.3}>
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial.geometry} material={materials['07___Default']} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_1.geometry} material={materials['08___Default']} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_2.geometry} material={materials['09___Default']} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_3.geometry} material={materials['01___Default']} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_4.geometry} material={materials['02___Default']} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial_5.geometry} material={materials['03___Default']} />
      </group>
    </group>
  )
}

useGLTF.preload("/assets/models/flower.glb")
