import React, { useEffect, useMemo, useRef, useState } from "react";
import { Group, TextureLoader, Vector3 } from "three";
import BoxOne from "./BoxOne";
import { Grid } from "@react-three/drei";
import BoxBrick from "./BoxBrick";
import BoxController from "./BoxController";
import { useGameStore } from "@/app/store/useGameStore";
import { stage1 } from "@/app/utils/gameData";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";

function BoxGame() {
    const stage1Problem = useGameStore((state) => state.stage1Problem);
    const setStageTypeClear = useGameStore((state) => state.setStageTypeClear);
    const setPlayerState = useGameStore((state) => state.setPlayerState);
    const [active, setActive] = useState(false);

    const matcapTexture1 = useMemo(() => {
        const textureLoader = new TextureLoader();
        return textureLoader.load("/assets/matcap/orange.png");
    }, []);

    const matcapTexture2 = useMemo(() => {
        const textureLoader = new TextureLoader();
        return textureLoader.load("/assets/matcap/purple.png");
    }, []);

    const textures = [matcapTexture1, matcapTexture2, null];

    const [boxes] = useState(() => {
        const positions = new Set<string>();
        const randomBoxes = [];

        while (positions.size < 5) {
            const x = Math.floor(Math.random() * 5) - 2;
            const z = Math.floor(Math.random() * 5) - 2;
            const key = `${x}_${z}`;
            if (!positions.has(key)) {
                positions.add(key);

                const texture = textures[Math.floor(Math.random() * textures.length)];

                randomBoxes.push({ x, z, texture });
            }
        }

        return randomBoxes;
    });

    const boxRefs = [
        useRef<Group>(null),
        useRef<Group>(null),
        useRef<Group>(null),
        useRef<Group>(null),
        useRef<Group>(null)
    ];

    useFrame(() => {
        if (boxRefs.every((ref) => ref.current)) {
            const currentPositions = boxRefs.map((ref) => {
                const globalPosition = new Vector3();
                ref.current?.getWorldPosition(globalPosition);
                return [globalPosition.x, globalPosition.y, globalPosition.z];
            });
    
            const remainingAnswers = [...stage1.answer[stage1Problem]];
    
            const matched = currentPositions.every((currentPos) => {
                const matchedIndex = remainingAnswers.findIndex(
                    (ans) =>
                        Math.abs(ans[0] - currentPos[0]) <= 0.1 &&
                        Math.abs(ans[1] - currentPos[1]) <= 0.1 &&
                        Math.abs(ans[2] - currentPos[2]) <= 0.1
                );
    
                if (matchedIndex !== -1) {
                    remainingAnswers.splice(matchedIndex, 1);
                    return true;
                }
    
                return false;
            });
    
            if (matched !== active) {
                setActive(matched);
                console.log(matched ? "정답!" : "오답!");
            }
        }
    });
    

    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                setStageTypeClear("STAGE1");
                setPlayerState("DEFAULT")
            }, 1000);
    
            return () => clearTimeout(timer);
        }
    }, [active]);

    return (
        <motion.group 
            initial={{y: -1}}
            animate={{y: 0.5}}
            transition={{ duration: 1, ease: "easeInOut"}}
            position={[0,0.5,-6]}

            >
            {boxes.map((box, index) =>
                box.texture ? (
                    <BoxOne
                        key={index}
                        texture={box.texture}
                        ref={boxRefs[index]}
                        active={active}
                        position={[box.x, 0, box.z]}
                    />
                ) : (
                    <BoxBrick
                        key={index}
                        ref={boxRefs[index]}
                        active={active}
                        position={[box.x, 0, box.z]}
                    />
                )
            )}
            <Grid 
                cellSize={0.5}
                args={[5, 5]} 
                position={[0,-0.5,0]} 
                sectionThickness={2}
                sectionSize={0.5}
                sectionColor={"#000"}
            />
            <BoxController number={stage1Problem} active={active}/>
        </motion.group>
    );
}

export default BoxGame;
