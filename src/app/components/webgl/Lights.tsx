import React, { useRef } from "react"
import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

function Lights() {
    const dirLight = useRef(null);
    const { scene } = useThree();

    useFrame(() => {
        if (scene.background) {
            scene.rotation.y += 0.001;
        }
    });
    
    return (
        <>
            <Environment
                resolution={256}
                files={[
                    "/assets/images/sky/px.png",
                    "/assets/images/sky/nx.png",
                    "/assets/images/sky/py.png",
                    "/assets/images/sky/ny.png",
                    "/assets/images/sky/pz.png",
                    "/assets/images/sky/nz.png",
                ]}
                environmentIntensity={0.1}
                background={false}
                ground={{
                    radius: 60,
                    scale: 20,
                    height: 1,
                }}
            />
            <directionalLight
                ref={dirLight}
                castShadow
                intensity={2}
                shadow-bias={-0.001}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                position={[5, 5, 5]}
                color="#fff"
            />
            <ambientLight intensity={1}/>
        </>
    )
}

export default Lights