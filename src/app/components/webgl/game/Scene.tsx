"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "./common/Lights";
import PlayerController from "./PlayerController";
import { Hole } from "./map/Hole";
import Map from "./map/Map";
import CameraResize from "./common/CameraResize";

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
        <section className="view" ref={sectionRef}>
            <Canvas
                orthographic
                shadows
                camera={{
                    position: [2, 5, 5],
                    left : -(window.innerWidth / window.innerHeight),
                    right : (window.innerWidth / window.innerHeight),
                    top: 1,
                    bottom: -1,
                    zoom: 0.25,
                    near: 0.1,
                    far: 2000,
                }}
            >
                <Lights />
                <Suspense fallback={<></>}>
                    <PlayerController />
                    <Hole/>
                    <Map/>
                    <CameraResize/>
                </Suspense>
            </Canvas>
        </section>
    );
}

export default Scene;
