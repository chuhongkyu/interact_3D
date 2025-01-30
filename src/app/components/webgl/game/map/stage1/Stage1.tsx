import mapData from "@/app/utils/MapData"
import { useGameStore } from "@/app/store/useGameStore";
import { Oirow } from "@/app/components/webgl/game/npc/Oirow";
import TextWrapper from "@/app/components/webgl/game/TextWrapper";
import Spot from "./Spot";
import { useEffect, useState } from "react";
import Badge from "../../common/Badge";

function Stage1() {
    const setPlayerState = useGameStore((state) => state.setPlayerState);
    const setStageTypeClear = useGameStore((state) => state.setStageTypeClear);
    const stageType = useGameStore((state) => state.stageType);
    const [isSecondStart, setSecondStart] = useState(false);
    const [isThirdStart, setThirdStart] = useState(false);

    useEffect(()=>{
        const isActiveStage = stageType.some(stage => stage.stage === "STAGE1" && stage.active);
        const isClearStage = stageType.some(stage => stage.stage === "STAGE1" && stage.clear);
        if (isActiveStage) {
            setSecondStart(true);
        }
        if(isClearStage) {
            setThirdStart(true);
        }
    },[stageType])

    return (
        <>
            <Oirow position={mapData[0].position}/>
            {isThirdStart && <Badge position={mapData[0].position} text="디자이너 | 와리오"/>}
            <Spot position={mapData[0].position}/>
            <TextWrapper 
                check="1"
                textArray={mapData[0].text}
                textArray2={mapData[0].text2}
                textArray3={mapData[0].text3}
                textSize2={"big"}
                textSize3={"big"}
                secondStart={isSecondStart}
                thirdStart={isThirdStart}
                position={mapData[0].position}
                onComplete={()=> setPlayerState("STAGE1")}
            />
        </>
    )
}

export default Stage1