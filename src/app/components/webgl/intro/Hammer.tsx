import * as THREE from 'three';
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

import { usePlayerStore } from '@/app/store/usePlayerStore';

type GLTFResult = GLTF & {
  nodes: {
    MarioHammer_SM_MarioHammer_0: THREE.Mesh;
  };
  materials: {
    SM_MarioHammer: THREE.MeshStandardMaterial;
  };
};

export function Hammer({ color = "0" }: { color?: string }) {
  const { nodes, materials } = useGLTF('/assets/models/hammer.glb') as GLTFResult;
  const [colorMaterial, setColorMaterial] = useState<THREE.MeshStandardMaterial | THREE.MeshToonMaterial >(materials.SM_MarioHammer);

  useEffect(() => {
    if (color === "0") {
      setColorMaterial(materials.SM_MarioHammer);
    }else if(color === "1"){
      const solidColorMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#cdcdcd"),
        metalness: 0.7,
        roughness: 0.5,
      });
      setColorMaterial(solidColorMaterial);
    }else {
      const solidColorMaterial = new THREE.MeshToonMaterial({
        color: new THREE.Color("#ffd700"),
      });
      setColorMaterial(solidColorMaterial);
    }
  }, [color, materials]);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.15, 0.03]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={nodes.MarioHammer_SM_MarioHammer_0.geometry}
        material={colorMaterial}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload('/assets/models/hammer.glb');