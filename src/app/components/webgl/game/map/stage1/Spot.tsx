import { RoundedBox, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { TextureLoader, Vector3 } from "three";
import { Box } from "../Box";
import { motion } from "framer-motion-3d";
import { stage1 } from "@/app/utils/gameData";
import { useGameStore } from "@/app/store/useGameStore";
import BoxGame from "./BoxGame";

function Spot(props: JSX.IntrinsicElements["group"]) {
    const texture = useTexture("/assets/textures/spot1.jpg");
    const playerState  = useGameStore((state) => state.playerState);
    const setStageTypeActive = useGameStore((state) => state.setStageTypeActive);
    const stageType = useGameStore((state) => state.stageType);
    const [isStart, setStart] = useState(false);

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

    const onStartStage = () => {
        if(playerState === "STAGE1")
        setStageTypeActive("STAGE1")
    }

    useEffect(()=>{
        const isActiveStage = stageType.some(stage => stage.stage === "STAGE1" && stage.active);
        const isClearStage = stageType.some(stage => stage.stage === "STAGE1" && stage.clear);
        if (isActiveStage) {
            setStart(true);
        }
        if(isClearStage) {
            setStart(false);
        }
    },[stageType])

    return (
        <group {...props} dispose={null}>
            <mesh receiveShadow position={[0,-0.04,0]} rotation={[-Math.PI/2,0,0]}>
                <planeGeometry args={[5, 5]}/>
                <meshStandardMaterial map={texture} transparent opacity={0.6}/>
            </mesh>
            {!isStart ?
            <motion.group
                initial={{z: -2}}
                animate={playerState === "STAGE1" ? {z: -2, y: -2} : {z: -2}}
                transition={{ duration: 1, delay: 1.5}}
                position={[0,0.5,-2]}
                onAnimationComplete={onStartStage}
                >
                {/* 1 */}
                <motion.group
                    initial={stage1.spot[0].initialRotation}
                    animate={playerState === "STAGE1" ? stage1.spot[0].startRotation : stage1.spot[0].initialRotation}
                    >
                    <RoundedBox
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
                </motion.group>
                
                {/* 2번 */}
                <motion.group
                    initial={stage1.spot[1].initialRotation}
                    animate={playerState === "STAGE1" ? stage1.spot[1].startRotation : stage1.spot[1].initialRotation}
                >
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
                </motion.group>
                {/* 3번 */}
                <motion.group
                    initial={stage1.spot[2].initialRotation}
                    animate={playerState === "STAGE1" ? stage1.spot[2].startRotation : stage1.spot[2].initialRotation}
                    >
                    <Box/>
                </motion.group>
                {/* 4번 */}
                <motion.group
                    initial={stage1.spot[3].initialRotation}
                    animate={playerState === "STAGE1" ? stage1.spot[3].startRotation : stage1.spot[3].initialRotation}
                    >
                    <RoundedBox
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
                </motion.group>
            </motion.group>
            : <BoxGame/>
            }
        </group>
    )
}

export default Spot