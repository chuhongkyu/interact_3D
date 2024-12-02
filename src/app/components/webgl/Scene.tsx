"use client"

import React from "react"
import { Canvas } from "@react-three/fiber"
import { Player } from "./Player"
import Lights from "./Lights"
import CameraGroup from "./CameraGroup"
import { World } from "./World"
import { useRef, useEffect } from "react"
import { useIntroStore } from "@/app/store/useIntroStore"

function Scene() {
  const sectionRef = useRef<HTMLTableSectionElement>(null);
  const { isLoading, setLoading } = useIntroStore()

  useEffect(()=>{
    const timeout = setTimeout(()=> {
      if(sectionRef?.current){
        sectionRef.current.classList.add("hide")
        setLoading(false);
      }
    }, 1000)

    return () => clearTimeout(timeout)

  },[sectionRef])

  return (
    <section className="view" ref={sectionRef}>
      <Canvas shadows>
        <CameraGroup/>
        <Lights/>
        <Player/>
        <World/>
      </Canvas>
    </section>
  )
}

export default Scene