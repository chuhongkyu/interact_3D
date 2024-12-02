import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    pCube34_phong1_0: THREE.Mesh
    pCube42_phong1_0: THREE.Mesh
    pCube33_phong1_0: THREE.Mesh
    pCube37_phong1_0: THREE.Mesh
    pCube41_phong1_0: THREE.Mesh
    pCube43_phong1_0: THREE.Mesh
    pCube38_phong1_0: THREE.Mesh
    pCube35_phong1_0: THREE.Mesh
    pCube36_phong1_0: THREE.Mesh
    pCube39_phong1_0: THREE.Mesh
    pCube44_phong1_0: THREE.Mesh
    isla_isla_map_0: THREE.Mesh
    pCube11_phong1_0: THREE.Mesh
    pCube24_phong1_0: THREE.Mesh
    pCube25_phong1_0: THREE.Mesh
    pCube26_phong1_0: THREE.Mesh
    pCube27_phong1_0: THREE.Mesh
    pCube28_phong1_0: THREE.Mesh
    pCylinder2_phong1_0: THREE.Mesh
    pCube11_phong1_0001: THREE.Mesh
    pCube25_phong1_0001: THREE.Mesh
    pCube26_phong1_0001: THREE.Mesh
    pCube27_phong1_0001: THREE.Mesh
    pCube28_phong1_0001: THREE.Mesh
    pCube45_phong1_0: THREE.Mesh
    pCube46_phong1_0: THREE.Mesh
    pCube47_phong1_0: THREE.Mesh
    pCube48_phong1_0: THREE.Mesh
    pCube49_phong1_0: THREE.Mesh
    pCylinder2_phong1_0001: THREE.Mesh
    pCube40_phong1_0: THREE.Mesh
    pCylinder1_phong1_0: THREE.Mesh
  }
  materials: {
    phong1: THREE.MeshStandardMaterial
    isla_map: THREE.MeshStandardMaterial
  }
}

export function World(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF("/assets/models/w.glb") as GLTFResult
  return (
    <group rotation-y={Math.PI} {...props} dispose={null}>
      <group scale={0.3}>
        <group receiveShadow castShadow position={[-19.733, 0, 44.928]} rotation={[0, 1.571, 0]}>
          <mesh receiveShadow castShadow geometry={nodes.pCube11_phong1_0001.geometry} material={materials.phong1} position={[29.252, 19.02, -5.83]} rotation={[0.077, -0.022, -0.1]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube25_phong1_0001.geometry} material={materials.phong1} position={[28.516, 7.546, -0.536]} rotation={[-0.03, -0.019, 0.102]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube26_phong1_0001.geometry} material={materials.phong1} position={[28.581, 13.78, 1.779]} rotation={[-0.099, -0.017, -0.092]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube27_phong1_0001.geometry} material={materials.phong1} position={[28.375, 7.92, 4.16]} rotation={[-0.03, 0.001, 0.012]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube28_phong1_0001.geometry} material={materials.phong1} position={[29.239, 7.189, 10.549]} rotation={[0.1, 0.161, 0.076]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube45_phong1_0.geometry} material={materials.phong1} position={[28.632, 8.007, 1.885]} rotation={[-0.072, 0.001, 0.012]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube46_phong1_0.geometry} material={materials.phong1} position={[28.34, 7.487, -3.076]} rotation={[0.031, 0.002, 0.012]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube47_phong1_0.geometry} material={materials.phong1} position={[28.326, 14.212, -10.028]} rotation={[0.031, 0.002, 0.012]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube48_phong1_0.geometry} material={materials.phong1} position={[28.627, 13.983, -5.722]} rotation={[-0.072, 0.001, 0.012]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCube49_phong1_0.geometry} material={materials.phong1} position={[28.066, 13.808, -7.895]} rotation={[-0.03, -0.019, 0.102]} scale={0.379} />
          <mesh receiveShadow castShadow geometry={nodes.pCylinder2_phong1_0001.geometry} material={materials.phong1} position={[37.817, 0.788, -15.479]} rotation={[-0.163, 1.018, -0.081]} scale={1.57} />
        </group>
        <mesh receiveShadow castShadow geometry={nodes.pCube34_phong1_0.geometry} material={materials.phong1} position={[17.337, -4.717, -18.053]} rotation={[0.046, -0.295, -0.141]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube42_phong1_0.geometry} material={materials.phong1} position={[12.688, -4.096, -17.458]} rotation={[0.134, -0.36, 0.199]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube33_phong1_0.geometry} material={materials.phong1} position={[0.147, -4.984, 11.203]} rotation={[0.111, -0.02, 0.149]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube37_phong1_0.geometry} material={materials.phong1} position={[-13.761, -4.13, 14.997]} rotation={[0.182, 0.282, -0.194]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube41_phong1_0.geometry} material={materials.phong1} position={[-6.538, -4.192, 13.707]} rotation={[-0.092, 0.255, 0.023]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube43_phong1_0.geometry} material={materials.phong1} position={[-16.916, -4.973, -11.874]} rotation={[-0.264, 0.43, 0.417]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube38_phong1_0.geometry} material={materials.phong1} position={[-13.946, -6.534, -34.609]} rotation={[0.207, 0.08, 0.123]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube35_phong1_0.geometry} material={materials.phong1} position={[41.222, -12.32, -22.493]} rotation={[0.004, 0.28, 0.217]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube36_phong1_0.geometry} material={materials.phong1} position={[-36.997, -7.739, -10.77]} rotation={[-0.023, 0.009, -0.247]} scale={0.623} />
        <mesh receiveShadow castShadow geometry={nodes.pCube39_phong1_0.geometry} material={materials.phong1} position={[41.599, -6.133, -17.145]} rotation={[0.005, -0.186, 0.055]} />
        <mesh receiveShadow castShadow geometry={nodes.pCube44_phong1_0.geometry} material={materials.phong1} position={[-43.053, -12.793, -11.562]} rotation={[-0.102, 0.36, -0.08]} />
        <mesh receiveShadow castShadow geometry={nodes.isla_isla_map_0.geometry} material={materials.isla_map} />
        <mesh receiveShadow castShadow geometry={nodes.pCube11_phong1_0.geometry} material={materials.phong1} position={[28.104, 7.638, -6.738]} rotation={[0.077, -0.022, -0.1]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCube24_phong1_0.geometry} material={materials.phong1} position={[28.393, 7.685, -8.897]} rotation={[-0.03, -0.104, 0.022]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCube25_phong1_0.geometry} material={materials.phong1} position={[28.514, 7.432, -4.134]} rotation={[-0.03, -0.019, 0.073]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCube26_phong1_0.geometry} material={materials.phong1} position={[28.123, 7.746, -1.632]} rotation={[-0.099, -0.017, -0.092]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCube27_phong1_0.geometry} material={materials.phong1} position={[28.371, 7.812, 0.562]} rotation={[-0.03, 0.001, 0.012]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCube28_phong1_0.geometry} material={materials.phong1} position={[27.894, 13.455, -4.493]} rotation={[0.113, -0.009, -0.19]} scale={0.379} />
        <mesh receiveShadow castShadow geometry={nodes.pCylinder2_phong1_0.geometry} material={materials.phong1} position={[27.948, 7.262, 6.128]} rotation={[-0.244, 1.446, 0.132]} scale={1.57} />
        <mesh receiveShadow castShadow geometry={nodes.pCube40_phong1_0.geometry} material={materials.phong1} position={[23.549, -6.195, 25.513]} rotation={[0.426, 0.552, -0.388]} />
        <mesh receiveShadow castShadow geometry={nodes.pCylinder1_phong1_0.geometry} material={materials.phong1} position={[19.227, 2.172, 26.689]} rotation={[0, 1.571, 0]} scale={2.53} />
      </group>
    </group>
  )
}

useGLTF.preload("/assets/models/w.glb")
