"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "./common/Lights";
import PlayerController from "./PlayerController";
import Map from "./map/Map";
import CameraResize from "./common/CameraResize";

function Scene() {
    const sectionRef = useRef<HTMLTableSectionElement>(null);
    const [cameraSettings, setCameraSettings] = useState({
        left: -1,
        right: 1,
        top: 1,
        bottom: -1,
    });

    useEffect(() => {
        const updateCameraSettings = () => {
            const aspect = window.innerWidth / window.innerHeight;
            setCameraSettings({
                left: -aspect,
                right: aspect,
                top: 1,
                bottom: -1,
            });
        };
        updateCameraSettings();
    }, []);

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
                    ...cameraSettings,
                    zoom: 0.25,
                    near: 0.1,
                    far: 2000,
                }}
            >
                <Lights />
                <color attach="background" args={["#8fb417"]}/>
                <Suspense fallback={<></>}>
                    <PlayerController />
                    <Map/>
                    <CameraResize/>
                </Suspense>
            </Canvas>
        </section>
    );
}

export default Scene;
