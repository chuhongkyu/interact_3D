import { Debug, Physics } from "@react-three/cannon"
import { Mushroom } from "./Mushroom"
import { GameBox } from "./GameBox"
import { Suspense, useEffect, useState } from "react"
import { stage2 } from "@/app/utils/gameData"
import { useGameStore } from "@/app/store/useGameStore"

interface IArray {
    key: string; 
    position: [number, number, number]; 
    clear: boolean;
}

function Game(props: JSX.IntrinsicElements["group"]) {
    const mushroomsCount = stage2.problem;
    const setStageTypeClear = useGameStore(state => state.setStageTypeClear);
    const setStage2Count = useGameStore(state => state.setStage2Count);

    const [array, setArray] = useState<IArray[]>([]);

    useEffect(() => {
        const now: IArray[] = Array.from({ length: mushroomsCount }).map((_, index) => ({
            key: `${index}-mushroom`, 
            position: [Math.random() * 6 - 3, 1, Math.random() * 3],
            clear: false, 
        }));
        setArray(now);
    }, [mushroomsCount]);

    const handleClear = (key: string) => {
        setArray((prevArray) =>
          prevArray.map((item) =>
            item.key === key ? { ...item, clear: true } : item
          )
        );
    };

    useEffect(() => {
        const clearedCount = array.filter((el) => el.clear).length;
        setStage2Count(clearedCount);

        if (clearedCount === mushroomsCount) {
            setStageTypeClear("STAGE2");
        }
    }, [array, mushroomsCount, setStageTypeClear, setStage2Count]);

    return (
        <group {...props}>
            <Physics broadphase="SAP" gravity={[0, -9.6, 0]} allowSleep>
                {/* <Debug scale={1.01} color={0xeb0000}> */}
                    <Suspense fallback={<></>}>
                        {array.map((item) => (
                            <Mushroom
                                key={item.key} 
                                position={item.position}
                                clear={item.clear}
                                onClick={() => handleClear(item.key)}
                            />
                        ))}
                        <GameBox />
                    </Suspense>
                {/* </Debug> */}
            </Physics>
        </group>
    );
}

export default Game;
