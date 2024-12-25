"use client"

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Player } from "@/app/components/webgl/Player";
import Lights from "../intro/Lights";

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
            <Canvas shadows>
                <Lights/>
                <Player/>
            </Canvas>
        </section>
    )
}

export default Scene