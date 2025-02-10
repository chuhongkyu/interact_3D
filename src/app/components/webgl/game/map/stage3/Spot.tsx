import SpotFloor from "../../common/SpotFloor"
import { RoundedBox, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { TextureLoader, Vector3 } from "three";
import { Box } from "../Box";

function Spot(props: JSX.IntrinsicElements["group"]) {
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
            <SpotFloor/>

            <group position={[2.5,0.5,0]}>
                <RoundedBox
                    position={[0,0,2]}
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
                    position={[0,0,1]}
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
                    position={[0,1,0]}
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
                    position={[0,1,-1]}
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
                    position={[0,2,-1]}
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
                <Box position={[0,0,-1]}/>
            </group>
        </group>
    )
}

export default Spot