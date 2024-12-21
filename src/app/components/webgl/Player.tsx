import * as THREE from 'three'
import React ,{ useEffect, useState } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { motion } from "framer-motion-3d"
import { usePlayerStore } from '@/app/store/usePlayerStore'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useIntroStore } from '@/app/store/useIntroStore'

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
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/assets/models/m.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)
  const { mode } = useIntroStore()
  const { setActions, actions: initialActions, setModelBone } = usePlayerStore();

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
    if (mode === "END") {
      if (group.current && actions) {
        const targetRotation = Math.PI;
        actions["Idle"]?.stop();
        actions["Walk"]?.play();
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          targetRotation, 
          0.02            
        );
        group.current.position.lerp(new THREE.Vector3(0, 0, -2), 0.02);
      }
    }
  });

  return (
    <motion.group>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="Sketchfab_model">
            <group name="fbx_mergefbx" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_2">
                <group name="RootNode">
                  <group name="Object_4">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh receiveShadow castShadow 
                      name="Object_7" 
                      geometry={nodes.Object_7.geometry} 
                      material={materials['mario_eye_tx.001']} 
                      skeleton={nodes.Object_7.skeleton} />
                    <skinnedMesh receiveShadow castShadow 
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
    </motion.group>
  )
}

useGLTF.preload('/assets/models/m.glb')
