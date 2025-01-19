import { RoundedBox, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { TextureLoader } from "three";
import { Box } from "./Box";

function Spot(props: JSX.IntrinsicElements["group"]) {
    const texture = useTexture("/assets/textures/spot1.jpg");

    const matcapTexture = useMemo(() => {
        const textureLoader = new TextureLoader();
        const matcapTexture = textureLoader.load("/assets/matcap/orange.png");
        return matcapTexture;
    }, []);

    const matcapTexture2 = useMemo(() => {
        const textureLoader = new TextureLoader();
        const matcapTexture2 = textureLoader.load("/assets/matcap/purple.png");
        return matcapTexture2;
    }, []);

    return (
        <group {...props} dispose={null}>
            <mesh receiveShadow position={[0,-0.04,0]} rotation={[-Math.PI/2,0,0]}>
                <planeGeometry args={[5, 5]}/>
                <meshStandardMaterial map={texture} transparent opacity={0.6}/>
            </mesh>
            <Box rotation={[0,-0.1,0]} position={[0.8,0,-2.3]}/>
            <RoundedBox
                position={[-2.2,0.5,-1.8]}
                args={[1,1,1]}
                radius={0.05}
                smoothness={4}
                bevelSegments={4}
                creaseAngle={0.4}
                castShadow
                receiveShadow
                >
                <meshMatcapMaterial matcap={matcapTexture} />
            </RoundedBox>
            <RoundedBox
                rotation={[0,0.4,0]}
                position={[-1,0.5,-2.2]}
                args={[1,1,1]}
                radius={0.05}
                smoothness={4}
                bevelSegments={4}
                creaseAngle={0.4}
                castShadow
                receiveShadow
                >
                <meshMatcapMaterial matcap={matcapTexture2} />
            </RoundedBox>
            <RoundedBox
                position={[2,0.5,-2]}
                args={[1,1,1]}
                radius={0.05}
                smoothness={4}
                bevelSegments={4}
                creaseAngle={0.4}
                castShadow
                receiveShadow
                >
                <meshMatcapMaterial matcap={matcapTexture} />
            </RoundedBox>
        </group>
    )
}

export default Spot