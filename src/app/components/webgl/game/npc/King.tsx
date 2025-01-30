import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { motion } from "framer-motion-3d";
import { useGameStore } from '@/app/store/useGameStore'
type ActionName = 'armature_boo|armature_booAction'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    tongue_low001_mtl_boo_0: THREE.SkinnedMesh
    tongue_low001_mtl_boo_0_1: THREE.SkinnedMesh
    tongue_low001_mtl_boo_0_2: THREE.SkinnedMesh
    tongue_low001_mtl_boo_0_3: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    mtl_boo: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    material_0: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function King(props: JSX.IntrinsicElements['group']) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/assets/models/king.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as GLTFResult
  const { actions } = useAnimations(animations, group)
  const checkPoint = useGameStore(state => state.checkPoint);

  useEffect(()=>{actions["armature_boo|armature_booAction"]?.play()},[actions])

  return (
      <motion.group
        initial={{ z: -2, y: 1}}
        animate={{
          z: checkPoint === "3" ? 0 : -2,  y: 1
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <group ref={group} {...props} name="Scene" scale={0.5} dispose={null}>
          <group name="amature" rotation={[-1.365, -0.103, 0.164]}>
            <primitive object={nodes._rootJoint} />
            <group name="body">
              <skinnedMesh
                receiveShadow
                name="tongue_low001_mtl_boo_0"
                geometry={nodes.tongue_low001_mtl_boo_0.geometry}
                skeleton={nodes.tongue_low001_mtl_boo_0.skeleton}
              >
                <motion.meshStandardMaterial
                  {...materials.mtl_boo}
                  transparent
                  animate={{ opacity: checkPoint === "3" ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              </skinnedMesh>

              <skinnedMesh
                receiveShadow
                name="tongue_low001_mtl_boo_0_1"
                geometry={nodes.tongue_low001_mtl_boo_0_1.geometry}
                skeleton={nodes.tongue_low001_mtl_boo_0_1.skeleton}
              >
                <motion.meshStandardMaterial
                  {...materials['Material.003']}
                  transparent
                  animate={{ opacity: checkPoint === "3" ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              </skinnedMesh>

              <skinnedMesh
                receiveShadow
                name="tongue_low001_mtl_boo_0_2"
                geometry={nodes.tongue_low001_mtl_boo_0_2.geometry}
                skeleton={nodes.tongue_low001_mtl_boo_0_2.skeleton}
              >
                <motion.meshStandardMaterial
                  {...materials['Material.001']}
                  transparent
                  animate={{ opacity: checkPoint === "3" ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              </skinnedMesh>

              <skinnedMesh
                receiveShadow
                name="tongue_low001_mtl_boo_0_3"
                geometry={nodes.tongue_low001_mtl_boo_0_3.geometry}
                skeleton={nodes.tongue_low001_mtl_boo_0_3.skeleton}
              >
                <motion.meshStandardMaterial
                  {...materials.material_0}
                  transparent
                  animate={{ opacity: checkPoint === "3" ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              </skinnedMesh>
            </group>
          </group>
        </group>
      </motion.group>
  )
}

useGLTF.preload('/assets/models/king.glb')
