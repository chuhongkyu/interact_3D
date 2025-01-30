import * as THREE from 'three'
import React, { useEffect, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useGameStore } from '@/app/store/useGameStore'
import { motion } from "framer-motion-3d"
import { motion as dmotion } from "motion/react"

type GLTFResult = GLTF & {
  nodes: {
    Object_0: THREE.Mesh
    Object_0_1: THREE.Mesh
  }
  materials: {
    ['Material.017']: THREE.MeshStandardMaterial
    boo_eye: THREE.MeshStandardMaterial
  }
}

export function Sboo() {
  const { nodes, materials } = useGLTF('/assets/models/sboo.glb') as GLTFResult;
  const originalRef = useGameStore(state => state.originalRef);
  const [ position, setPosition] = useState(new THREE.Vector3(0,0,0));
  const setStageTypeActive = useGameStore((state) => state.setStageTypeActive);
  const [isStart, setStart] = useState(true);

  useEffect(()=>{
    if(originalRef?.position){
      setPosition(originalRef?.position)
    }
    setStageTypeActive("STAGE2")
  },[originalRef])

  useEffect(()=>{
    const timeout = setTimeout(()=> setStart(false), 3000)
    return ()=> clearTimeout(timeout);
  },[])

  return (
    <group position={position} dispose={null}>
      <motion.group
        initial={{rotateY: 0}}
        animate={{rotateY: [0, Math.PI, 0]}}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5}}
        >
        <motion.group
          initial={{x: 0}}
          animate={{x: [0,0.5,0], y: [0,0.5,0], 
            transition: { duration: 3, ease: "easeInOut", repeat: Infinity}
          }}
          >
          <group scale={0.5} rotation={[0,Math.PI,0]} position={[-2, 1.152, 0.037]}>
            <mesh receiveShadow geometry={nodes.Object_0.geometry}>
              <motion.meshStandardMaterial
                {...materials['Material.017']}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
            <mesh receiveShadow geometry={nodes.Object_0_1.geometry}>
              <motion.meshStandardMaterial
                {...materials.boo_eye}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
          </group>
        </motion.group>
        <motion.group
          initial={{z: 0}}
          animate={{z: [0,0.5,0], y: [0,0.5,0], 
            transition: { duration: 3, ease: "easeInOut", repeat: Infinity}
          }}
          >
          <group scale={0.5} rotation={[0,Math.PI/2,0]} position={[0, 1.152, -2]}>
            <mesh receiveShadow geometry={nodes.Object_0.geometry}>
              <motion.meshStandardMaterial
                {...materials['Material.017']}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
            <mesh receiveShadow geometry={nodes.Object_0_1.geometry}>
              <motion.meshStandardMaterial
                {...materials.boo_eye}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
          </group>
        </motion.group>
        <motion.group
          initial={{z: 0, y: 1}}
          animate={{z: [0,0.5,1.5,1,0], y: [1,0,0.5,1], 
            transition: { duration: 4, ease: "easeInOut", repeat: Infinity}
          }}
          >
          <group scale={0.5} rotation={[0,0,0]} position={[2, 1.152, 0.037]}>
            <mesh receiveShadow geometry={nodes.Object_0.geometry}>
              <motion.meshStandardMaterial
                {...materials['Material.017']}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
            <mesh receiveShadow geometry={nodes.Object_0_1.geometry}>
              <motion.meshStandardMaterial
                {...materials.boo_eye}
                transparent
                animate={{ opacity: [0.4,1,0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </mesh>
          </group>
        </motion.group>
      </motion.group>

      {isStart && 
      <>
        <Html center position={[-3,0,0]}>
          <dmotion.div 
            initial={{opacity: 0.5}}
            animate={{opacity: [0.5,1,0.5]}}
            transition={{ duration: 2, ease: "easeInOut", delay: 0, repeat: Infinity}}
            className={"text-container-npc small"}>
            소셜 로그인이 필요해요~
          </dmotion.div>
        </Html>

        <Html center position={[2.5,-0.5,0]}>
          <dmotion.div 
            initial={{opacity: 0.5}}
            animate={{opacity: [0.5,1,0.5]}}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2, repeat: Infinity}}
            className={"text-container-npc small"}>
            다국어 지원을 하기로 결정되었어요!
          </dmotion.div>
        </Html>

        <Html center position={[1,3,0]}>
          <dmotion.div 
            initial={{opacity: 0.}}
            animate={{opacity: [0.5,1,0.5]}}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.4, repeat: Infinity}}
            className={"text-container-npc small"}>
          빌링이 당장 필요해요~
          </dmotion.div>
        </Html>
      </>
      }
      
    </group>
  )
}

useGLTF.preload('/assets/models/sboo.glb')
