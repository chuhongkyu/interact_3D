import * as THREE from 'three'
import React ,{ useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type ActionName = 'Run' | 'mixamo.com' | 'Walk' | 'Jump' | 'Run_2'

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
  
  useEffect(() => {
    if(actions){
      actions["mixamo.com"]?.play();
    }
  }, [actions])
  

  return (
    <group rotation={[Math.PI/2,0,0]} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="fbx_mergefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh receiveShadow castShadow name="Object_7" geometry={nodes.Object_7.geometry} material={materials['mario_eye_tx.001']} skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh receiveShadow castShadow name="Object_8" geometry={nodes.Object_8.geometry} material={materials['mario_all_tx.001']} skeleton={nodes.Object_8.skeleton} />
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
