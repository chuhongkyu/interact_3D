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
import { stage1, stage2 } from '@/app/utils/gameData'
import Badge from './game/common/Badge'
import { useQueryDataStore } from '@/app/store/useQueryData'

type ActionName = 'Idle' | 'Jump' | 'Run2' | 'Run_Object_4' | 'Walk'

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
  const career = useQueryDataStore(state => state.career);
  const { pointerPosition, checkPoint, setCheckPoint, setOriginalPlayerRef, stageType } = useGameStore();
  const playerState  = useGameStore((state) => state.playerState);

  useEffect(() => {
    if (actions) {
      setActions(actions)
    }
  }, [actions]);

  useEffect(()=>{
    if(initialActions){
      initialActions["Idle"]?.play();
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
      const [x0, y0, z0] = mapData[0].position;
      const [x1, y1, z1] = mapData[1].position;
      const [x2, y2, z2] = mapData[2].position;

      if (Math.abs(playerPosition.x - x0) < 2 && Math.abs(playerPosition.z - z0) < 2) {
        if (checkPoint !== "1") {
          setCheckPoint("1");
        }
      } else if (Math.abs(playerPosition.x - x1) < 2 && Math.abs(playerPosition.z - z1) < 2) {
        if (checkPoint !== "2") {
          setCheckPoint("2");
        }
      } else if (Math.abs(playerPosition.x - x2) < 2 && Math.abs(playerPosition.z - z2) < 2) {
        if (checkPoint !== "3") {
          setCheckPoint("3");
        }
      }else {
        setCheckPoint("0");
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
        case "STAGE2" : 
          cameraPosition.copy(new THREE.Vector3(...stage2.spotPosition)).add(cameraOffset);  
          camera.position.lerp(cameraPosition, 0.1);
          camera.lookAt(new THREE.Vector3(...stage2.spotPosition));
          camera.updateProjectionMatrix();
        default:
          break;
      }
    }
  });

  useEffect(()=>{
    if(playerRef.current){
      setOriginalPlayerRef(playerRef.current)
    }
  },[playerRef])

  useEffect(()=>{
    const isActiveStage = stageType.some(stage => stage.stage === "STAGE2" && stage.active);
    if(playerState === "STAGE2"){
      if(isActiveStage && actions){
        actions['Idle']?.stop();
        actions['Run2']?.play();
      }else{
        actions['Run2']?.stop();
        actions['Idle']?.play();
      }
    }
  },[playerState, stageType, actions])

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
      {pathname === "/game" && <Badge 
        position={[0,0,0]} 
        text={`${career !== "0" ? career : 1}년차 개발자`}  
        color="#fb4753"
        delay={2}
      />}
    </group>
  )
}

useGLTF.preload('/assets/models/m.glb')
