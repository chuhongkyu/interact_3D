import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
  }
  materials: {
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.013']: THREE.MeshStandardMaterial
  }
}

export function Turtle({color}:{color?:string}) {
  const { nodes, materials } = useGLTF("/assets/models/turtle.glb") as GLTFResult
  return (
    <group scale={0.2} rotation={[-Math.PI/2, Math.PI/2,0]}>
      <group position={[-0.315, 1.403, -0.067]} scale={[1.643, 1.406, 1.26]}>
        <mesh geometry={nodes.Object_7.geometry} material={materials['Material.008']} />
        {color == "1" && <mesh geometry={nodes.Object_8.geometry} material={materials['Material.013']} />}
      </group>
    </group>
  )
}

useGLTF.preload("/assets/models/turtle.glb")
