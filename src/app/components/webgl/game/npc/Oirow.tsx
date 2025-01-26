import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGameStore } from '@/app/store/useGameStore'
import { motion } from "framer-motion-3d"

type ActionName = 'mixamo.com'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh
    Object_9: THREE.SkinnedMesh
    Object_11: THREE.SkinnedMesh
    Object_13: THREE.SkinnedMesh
    Object_15: THREE.SkinnedMesh
    Object_16: THREE.SkinnedMesh
    Object_17: THREE.SkinnedMesh
    Object_19: THREE.SkinnedMesh
    Object_20: THREE.SkinnedMesh
    Object_22: THREE.SkinnedMesh
    Object_23: THREE.SkinnedMesh
    Object_24: THREE.SkinnedMesh
    Object_25: THREE.SkinnedMesh
    Object_26: THREE.SkinnedMesh
    Object_27: THREE.SkinnedMesh
    Object_28: THREE.SkinnedMesh
    Object_29: THREE.SkinnedMesh
    Object_30: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Mat_0mat: THREE.MeshStandardMaterial
    Mat_1mat: THREE.MeshStandardMaterial
    Mat_2mat: THREE.MeshStandardMaterial
    Mat_3mat: THREE.MeshStandardMaterial
    Mat_4mat: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Oirow(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/assets/models/oirow.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)
  const [start, setStart] = useState(false);

  useEffect(()=>{ actions["mixamo.com"]?.play() },[actions])
  const playerState  = useGameStore((state) => state.playerState);

  useEffect(()=>{
    if(!group.current) return;

    switch (playerState) {
      case "DEFAULT":
        setStart(false);
        break;
      case "STAGE1":
        setStart(true);
        // group.current.visible = false;
        break;
      default:
        break;
    }
  },[playerState])

  return (
    <group ref={group} {...props} dispose={null}>
      <motion.group 
        name="oirow" 
        initial={{ rotateY: 0}}
        animate={start ? {rotateY: Math.PI, z: -1 }: {rotateY: 0}}
        transition={{ duration: 1, ease: "easeInOut"}}
        >
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.03}>
          <group name="3c519cd86b2949279f877c799d8ba3b6fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh receiveShadow castShadow name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_9.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_11" geometry={nodes.Object_11.geometry} material={materials.Mat_1mat} skeleton={nodes.Object_11.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Mat_2mat} skeleton={nodes.Object_13.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_15" geometry={nodes.Object_15.geometry} material={materials.Mat_2mat} skeleton={nodes.Object_15.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Mat_1mat} skeleton={nodes.Object_16.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_17" geometry={nodes.Object_17.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_17.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_19" geometry={nodes.Object_19.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_19.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_20" geometry={nodes.Object_20.geometry} material={materials.Mat_1mat} skeleton={nodes.Object_20.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_22" geometry={nodes.Object_22.geometry} material={materials.Mat_1mat} skeleton={nodes.Object_22.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_23" geometry={nodes.Object_23.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_23.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_24" geometry={nodes.Object_24.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_24.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_25" geometry={nodes.Object_25.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_25.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_26" geometry={nodes.Object_26.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_26.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_27" geometry={nodes.Object_27.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_27.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_28" geometry={nodes.Object_28.geometry} material={materials.Mat_3mat} skeleton={nodes.Object_28.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_29" geometry={nodes.Object_29.geometry} material={materials.Mat_4mat} skeleton={nodes.Object_29.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_30" geometry={nodes.Object_30.geometry} material={materials.Mat_0mat} skeleton={nodes.Object_30.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </motion.group>
    </group>
  )
}

useGLTF.preload('/assets/models/oirow.glb')
