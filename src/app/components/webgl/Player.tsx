import * as THREE from 'three'
import React ,{ useEffect, useRef, useState } from 'react'
import { useFrame, useGraph, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { usePlayerStore } from '@/app/store/usePlayerStore'
import { useIntroStore } from '@/app/store/useIntroStore'
import { usePathname } from 'next/navigation'
import { useGameStore } from '@/app/store/useGameStore'
import mapData from '@/app/utils/MapData'
import { motion } from "framer-motion-3d";
import { stage1 } from '@/app/utils/gameData'

type ActionName = 'Idle' | 'Jump' | 'Run_2' | 'Run' | 'Walk'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh
    Object_8: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    ['mario_eye_tx.001']: THREE.MeshStandardMaterial
    ['mario_all_tx.001']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Player(props: JSX.IntrinsicElements['group']) {
  const playerRef = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/assets/models/m.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, playerRef)
  const { camera } = useThree();
  const pathname = usePathname();
  const isMoving = useRef(false);

  const { mode } = useIntroStore();
  const { setActions, actions: initialActions, setModelBone } = usePlayerStore();
  
  const { pointerPosition, checkPoint, setCheckPoint, stageType } = useGameStore();
  const playerState  = useGameStore((state) => state.playerState);

  useEffect(() => {
    if (actions) {
      setActions(actions)
    }
  }, [actions]);

  useEffect(()=>{
    if(initialActions){
      const defaultAction = actions["Idle"];

      if (defaultAction) {
        defaultAction.play();
      }
    }
  },[initialActions])

  useEffect(()=>{
    if(nodes?._rootJoint){
      setModelBone(nodes._rootJoint)
    }
  },[nodes])

  useFrame(() => {
    if (pathname === "/" && mode === "END") {
      if (playerRef.current && actions) {
        const targetRotation = Math.PI;
        actions["Idle"]?.stop();
        actions["Walk"]?.play();

        playerRef.current.rotation.y = THREE.MathUtils.lerp(
          playerRef.current.rotation.y,
          targetRotation, 
          0.02            
        );
        playerRef.current.position.lerp(new THREE.Vector3(0, 0, -2), 0.02);
      }
    }

    if (pathname === "/game" && playerRef.current) {
      const playerPosition = playerRef.current.position;
      const [x, y, z] = mapData[0].position;

      if (
        Math.abs(playerPosition.x - x) < 2 &&
        Math.abs(playerPosition.z - z) < 2
      ) {
        if(checkPoint !== "1"){
          setCheckPoint("1")
        }
      }else{
        setCheckPoint("0")
      }
      
      const distance = playerPosition.distanceTo(pointerPosition);
      if (distance > 0.1) {
        isMoving.current = true;
        const angle = Math.atan2(
            pointerPosition.z - playerPosition.z,
            pointerPosition.x - playerPosition.x
        );
        playerPosition.x += Math.cos(angle) * 0.05;
        playerPosition.z += Math.sin(angle) * 0.05;
        
        playerRef.current.rotation.y = -angle + Math.PI / 2;
        
        actions["Idle"]?.stop();
        actions["Walk"]?.play();
      } else if (isMoving.current) {
        isMoving.current = false;
        actions["Walk"]?.stop();
        actions["Idle"]?.play();
      }
      
      let cameraOffset = new THREE.Vector3(2, 5, 5);
      const cameraPosition = new THREE.Vector3();

      switch (playerState) {
        case "DEFAULT":
          cameraPosition.copy(playerPosition).add(cameraOffset);  
          camera.position.lerp(cameraPosition, 0.9);
          camera.lookAt(new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z));
          break;
        case "STAGE1" : 
          cameraPosition.copy(new THREE.Vector3(...stage1.spotPosition)).add(cameraOffset);  
          camera.position.lerp(cameraPosition, 0.1);
          camera.lookAt(new THREE.Vector3(...stage1.spotPosition));
          camera.updateProjectionMatrix();
        default:
          break;
      }
    }
  });

  return (
    <group ref={playerRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group name="fbx_mergefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive receiveShadow castShadow object={nodes._rootJoint} />
                  <skinnedMesh 
                    receiveShadow 
                    castShadow 
                    name="Object_7" 
                    geometry={nodes.Object_7.geometry} 
                    material={materials['mario_eye_tx.001']} 
                    skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh 
                    receiveShadow 
                    castShadow 
                    name="Object_8" 
                    geometry={nodes.Object_8.geometry} 
                    material={materials['mario_all_tx.001']} 
                    skeleton={nodes.Object_8.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/m.glb')
