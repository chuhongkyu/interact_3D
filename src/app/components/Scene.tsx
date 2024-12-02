"use client"

import React from "react"
import { Canvas } from "@react-three/fiber"

function Scene() {
  return (
    <Canvas>
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
    </Canvas>
  )
}

export default Scene