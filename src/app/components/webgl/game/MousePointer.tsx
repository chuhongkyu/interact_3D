import { useGameStore } from "@/app/store/useGameStore";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function MousePointer() {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointerPosition = useGameStore((state) => state.pointerPosition);
    const playerState  = useGameStore((state) => state.playerState);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.lerp(pointerPosition, 0.1);
        }
    });

    useEffect(()=>{
        if(!meshRef.current) return;
    
        switch (playerState) {
          case "DEFAULT":
            meshRef.current.visible = true;
            break;
          case "STAGE1":
            meshRef.current.visible = false;
            break;
          default:
            break;
        }
    },[playerState])

    return (
        <mesh ref={meshRef} rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry args={[0.5, 32]} />
            <meshBasicMaterial color="#d91c1c" transparent opacity={0.5} />
        </mesh>
    );
}

export default MousePointer;