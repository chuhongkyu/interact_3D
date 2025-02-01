import { useSphere } from '@react-three/cannon';
import { PivotControls, useAnimations, useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { motion } from "framer-motion-3d";

type ActionName = 'idle'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_0: THREE.Mesh
    Object_0_1: THREE.Mesh
    Object_0_2: THREE.Mesh
  }
  materials: {
    material: THREE.MeshStandardMaterial
    face: THREE.MeshStandardMaterial
    head: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Mushroom({
  position,
  clear,
  onClick,
}: {
  position?: [number, number, number];
  clear: boolean;
  onClick: () => void;
}){
  const { nodes, materials, animations } = useGLTF('/assets/models/mushroom.glb') as GLTFResult
  const group = useRef<Group>(null)
  
  const [ref, api] = useSphere<Group>(() => ({
    type: "Dynamic",
    args: [0.4],
    mass: 1,
    position: position || [0, 1, 0],
    onCollide: handleCollision,
  }));

  function handleCollision(e: any) {
    const { body } = e;
    if (body?.name === "mushroom") {
      api.velocity.set(0, 0.2, 0);
    }
  }

  if (clear) {
    api.velocity.set(0, 0, 0);
    api.sleep();
  }

  return (
    <>
      {!clear && 
      <group name="mushroom" ref={ref} castShadow receiveShadow onClick={onClick}>
        <group ref={group} dispose={null}>
          <motion.group name="Scene" whileHover={{scale: 1.1}} whileTap={{ scale: 1.1}}>
            <group position={[0, 0, -0.1]} scale={0.068}>
              <mesh receiveShadow castShadow name="Object_0" geometry={nodes.Object_0.geometry} material={materials.material} />
              <mesh receiveShadow castShadow name="Object_0_1" geometry={nodes.Object_0_1.geometry} material={materials.face} />
              <mesh receiveShadow castShadow name="Object_0_2" geometry={nodes.Object_0_2.geometry} material={materials.head} />
            </group>
          </motion.group>
        </group>
      </group>}
    </>
  );
}

useGLTF.preload('/assets/models/mushroom.glb')
