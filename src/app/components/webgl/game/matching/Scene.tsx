"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "../Lights";
import { Box, Environment, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Floor from "../Floor";
import Item from "./Item";
import GizmoController from "./GizmoController";
import { Oirow } from "../npc/Oirow";
import UserView from "./UserView";
import ComputerFace from "./ComputerFace";

function Scene() {
    const sectionRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (sectionRef?.current) {
                sectionRef.current.classList.add("hide");
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [sectionRef]);

    return (
        <section className="view" ref={sectionRef} style={{background: "#A7C539"}}>
            <div className="matching-view-wrapper">
                <div className="matching-view">
                    <UserView/>
                    <View className="view-scene">
                        <Environment preset="sunset" blur={0.5}/>
                        <Suspense fallback={<></>}>
                            
                            
                        </Suspense>
                    </View>
                    <ComputerFace/>
                </div>
            </div>
            <Canvas shadows>
                <View.Port/>
            </Canvas>
        </section>
    );
}

export default Scene;
