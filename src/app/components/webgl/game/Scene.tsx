"use client"

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import Lights from "./Lights";
import PlayerController from "./PlayerController";

function Scene() {
    const sectionRef = useRef<HTMLTableSectionElement>(null);

    useEffect(()=>{
        const timeout = setTimeout(()=> {
          if(sectionRef?.current){
            sectionRef.current.classList.add("hide")
          }
        }, 1000)
    
        return () => clearTimeout(timeout)
    
    },[sectionRef])

    return (
        <section className="view" ref={sectionRef}>
            <Canvas 
                orthographic 
                shadows
                camera={{
                    position: [2,5,5],
                    left: -(window.innerWidth / window.innerHeight),
                    right: window.innerWidth / window.innerHeight,
                    top: 1,
                    bottom: -1,
                    near: -1000,
                    far: 1000,
                    zoom: 0.25
                }}
                >
                <Lights/>
                <Suspense fallback={<></>}>
                    <PlayerController/>
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Scene