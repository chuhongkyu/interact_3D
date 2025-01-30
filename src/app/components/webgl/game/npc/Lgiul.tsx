import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGameStore } from '@/app/store/useGameStore'

type ActionName = 'punch' | 'walking'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Object_10: THREE.SkinnedMesh
    Object_11: THREE.SkinnedMesh
    Object_12: THREE.SkinnedMesh
    Object_13: THREE.SkinnedMesh
    Object_14: THREE.SkinnedMesh
    Object_16: THREE.SkinnedMesh
    Object_17: THREE.SkinnedMesh
    Object_7: THREE.SkinnedMesh
    Object_8: THREE.SkinnedMesh
    Object_9: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    Material_53: THREE.MeshStandardMaterial
    Material_51: THREE.MeshStandardMaterial
    Material_54: THREE.MeshStandardMaterial
    Material_52: THREE.MeshStandardMaterial
    Material_44: THREE.MeshStandardMaterial
    Material_49: THREE.MeshStandardMaterial
    Material_38: THREE.MeshStandardMaterial
    Material_50: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Lgiul(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/assets/models/igiul.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)
  const checkPoint  = useGameStore((state) => state.checkPoint);

  useEffect(()=>{
    if(checkPoint === "0"){
      actions["punch"]?.stop()
      actions["walking"]?.play()
    }else if(checkPoint === "2"){
      actions["walking"]?.stop()
      actions["punch"]?.play()
    }
    
  },[actions, checkPoint])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Object_2">
          <group name="RootNode">
            <group name="Object_4">
              <primitive object={nodes._rootJoint} />
              <skinnedMesh castShadow receiveShadow name="Object_10" geometry={nodes.Object_10.geometry} material={materials.Material_53} skeleton={nodes.Object_10.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_11" geometry={nodes.Object_11.geometry} material={materials.Material_51} skeleton={nodes.Object_11.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_12" geometry={nodes.Object_12.geometry} material={materials.Material_54} skeleton={nodes.Object_12.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Material_52} skeleton={nodes.Object_13.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_14" geometry={nodes.Object_14.geometry} material={materials.Material_44} skeleton={nodes.Object_14.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_16" geometry={nodes.Object_16.geometry} material={materials.Material_51} skeleton={nodes.Object_16.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_17" geometry={nodes.Object_17.geometry} material={materials.Material_52} skeleton={nodes.Object_17.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_7" geometry={nodes.Object_7.geometry} material={materials.Material_49} skeleton={nodes.Object_7.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_8" geometry={nodes.Object_8.geometry} material={materials.Material_38} skeleton={nodes.Object_8.skeleton} />
              <skinnedMesh castShadow receiveShadow name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Material_50} skeleton={nodes.Object_9.skeleton} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/igiul.glb')
