"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Lights from "./Lights";
import PlayerController from "./PlayerController";
import { Hole } from "./map/Hole";
import Map from "./map/Map";

function Scene() {
    const sectionRef = useRef<HTMLTableSectionElement>(null);
    const [cameraSettings, setCameraSettings] = useState({
        left: -1,
        right: 1,
        top: 1,
        bottom: -1,
        zoom: 0.25,
    });

    useEffect(() => {
        const updateCameraSettings = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            setCameraSettings({
                left: -aspectRatio,
                right: aspectRatio,
                top: 1,
                bottom: -1,
                zoom: 0.25,
            });
        };

        updateCameraSettings();
        window.addEventListener("resize", updateCameraSettings);

        return () => {
            window.removeEventListener("resize", updateCameraSettings);
        };
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
                    near: -1000,
                    far: 1000,
                }}
            >
                <Lights />
                <Suspense fallback={<></>}>
                    <PlayerController />
                    <Hole/>
                    <Map/>
                </Suspense>
            </Canvas>
        </section>
    );
}

export default Scene;
