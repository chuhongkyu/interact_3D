import React, { useMemo } from "react";
import { TextureLoader } from "three";
import { Box } from "../Box";
import BoxOne from "./BoxOne";
import { Grid } from "@react-three/drei";

function BoxGame() {
    const matcapTexture1 = useMemo(() => {
        const textureLoader = new TextureLoader();
        return textureLoader.load("/assets/matcap/orange.png");
    }, []);

    const matcapTexture2 = useMemo(() => {
        const textureLoader = new TextureLoader();
        return textureLoader.load("/assets/matcap/purple.png");
    }, []);

    const textures = [matcapTexture1, matcapTexture2, null];

    const boxes = useMemo(() => {
        const positions = new Set<string>();
        const randomBoxes = [];

        while (positions.size < 5) {
            const x = Math.floor(Math.random() * 5) - 2; // -2 ~ 2
            const z = Math.floor(Math.random() * 5) - 2; // -2 ~ 2
            const key = `${x}_${z}`;
            if (!positions.has(key)) {
                positions.add(key);

                const texture = textures[Math.floor(Math.random() * textures.length)];

                randomBoxes.push({ x, z, texture });
            }
        }

        return randomBoxes;
    }, [textures]);

    return (
        <group position={[0,0.5,-6]}>
            {boxes.map((box, index) =>
                box.texture ? (
                    <BoxOne
                        key={index}
                        texture={box.texture}
                        position={[box.x, 0, box.z]}
                    />
                ) : (
                    <Box
                        key={index}
                        position={[box.x, 0, box.z]}
                    />
                )
            )}
            <Grid 
                cellSize={1}
                args={[5.5, 5.5]} 
                position={[0.5,-0.5,0.5]} 
                sectionColor={"#000"}
            />
        </group>
    );
}

export default BoxGame;
