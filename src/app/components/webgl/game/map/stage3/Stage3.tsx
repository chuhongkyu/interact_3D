import mapData from "@/app/utils/MapData"
import { useGameStore } from "@/app/store/useGameStore";
import TextWrapper from "@/app/components/webgl/game/TextWrapper";
import { useEffect, useState } from "react";
import Badge from "@/app/components/webgl/game/common/Badge";
import { M2 } from "@/app/components/webgl/game/npc/M2";
import Spot from "./Spot";

function Stage3() {
    const playerState = useGameStore((state) => state.playerState);
    const checkPoint = useGameStore((state) => state.checkPoint);
    const setPlayerState = useGameStore((state) => state.setPlayerState);
    const setStageTypeClear = useGameStore((state) => state.setStageTypeClear);
    const stageType = useGameStore((state) => state.stageType);
    const [isSecondStart, setSecondStart] = useState(false);
    const [isThirdStart, setThirdStart] = useState(false);

    useEffect(()=>{
        const isActiveStage = stageType.some(stage => stage.stage === "STAGE3" && stage.active);
        const isClearStage = stageType.some(stage => stage.stage === "STAGE3" && stage.clear);

        if(isClearStage) {
            setThirdStart(true);
        }
    },[stageType])


    return (
        <>
            <M2 position={mapData[3].position}/>
            <Spot position={mapData[3].position}/>
            <TextWrapper 
                check="4"
                textArray={mapData[3].text}
                textSize={"big"}
                // textArray2={mapData[3].text2}
                textArray3={mapData[3].text3}
                // secondStart={isSecondStart}
                thirdStart={isThirdStart}
                position={mapData[3].position}
                onComplete={()=> setPlayerState("STAGE3")}
            />
        </>
    )
}

export default Stage3