import { useGameStore } from "@/app/store/useGameStore";
import { useTexture } from "@react-three/drei"
import React from "react"
import { RepeatWrapping } from "three";
import * as THREE from "three";

function Floor() {
    const setPointerPosition = useGameStore((state) => state.setPointerPosition);
    const playerState = useGameStore((state)=> state.playerState);

    const texture = useTexture("/assets/images/bg.png");
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(8, 8);

    const handlePointerDown = (event: THREE.Event) => {
        if(playerState !== "DEFAULT") return;
        const { point }:any = event;
        setPointerPosition(new THREE.Vector3(point.x, 0.02, point.z));
    };

    return (
        <>
            <mesh castShadow receiveShadow onClick={handlePointerDown} position={[0,-0.05,0]} rotation={[-Math.PI/2,0,0]}>
                <planeGeometry args={[50, 50]}/>
                <meshStandardMaterial map={texture}/>
            </mesh>
        </>
    )
}

export default Floor