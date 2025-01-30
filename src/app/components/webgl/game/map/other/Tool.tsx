import * as THREE from 'three';
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    MarioHammer_SM_MarioHammer_0: THREE.Mesh;
  };
  materials: {
    SM_MarioHammer: THREE.MeshStandardMaterial;
  };
};

export function Tool(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/assets/models/hammer.glb') as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.15, 0.03]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={nodes.MarioHammer_SM_MarioHammer_0.geometry}
        material={materials.SM_MarioHammer}
        scale={0.012}
      />
    </group>
  );
}

useGLTF.preload('/assets/models/hammer.glb');