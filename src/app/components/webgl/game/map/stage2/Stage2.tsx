import mapData from "@/app/utils/MapData"
import { useGameStore } from "@/app/store/useGameStore";
import TextWrapper from "@/app/components/webgl/game/TextWrapper";
import { useEffect, useState } from "react";
import Badge from "@/app/components/webgl/game/common/Badge";
import { King } from "@/app/components/webgl/game/npc/King";
import Spot from "./Spot";
import { Sboo } from "./Sboo";
import Game from "./Game";
import { stage2 } from "@/app/utils/gameData";

function Stage2() {
    const playerState = useGameStore((state) => state.playerState);
    const checkPoint = useGameStore((state) => state.checkPoint);
    const setPlayerState = useGameStore((state) => state.setPlayerState);
    const stageType = useGameStore((state) => state.stageType);
    const [isSecondStart, setSecondStart] = useState(false);

    useEffect(()=>{
        const isClearStage = stageType.some(stage => stage.stage === "STAGE2" && stage.clear);
        if(isClearStage) {
            setPlayerState("DEFAULT")
            setSecondStart(true);
        }
    },[stageType])

    return (
        <>
            <King position={mapData[2].position}/>
            {checkPoint === "3" && <Badge 
                position={[
                    mapData[2].position[0] - 0.5,
                    mapData[2].position[1] + 1,
                    mapData[2].position[2]
                ]} 
                text="기획팀 팀장 | 킹 부우"/>}
            <Spot position={mapData[2].position}/>
            {playerState === "STAGE2" && !isSecondStart && <Sboo/>}
            {playerState === "STAGE2" && !isSecondStart && <Game position={stage2.spotPosition}/>}
            <TextWrapper 
                check="3"
                textArray={mapData[2].text}
                textSize={"big"}
                textArray2={mapData[2].text2}
                secondStart={isSecondStart}
                position={mapData[2].position}
                onComplete={()=> setPlayerState("STAGE2")}
            />
        </>
    )
}

export default Stage2