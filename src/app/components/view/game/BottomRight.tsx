"use client"

import { useGameStore } from "@/app/store/useGameStore"
import BoxExample from "./stage1/BoxExample";
import MushroomInfo from "./stage2/MushroomInfo";

function BottomRight() {
    const stageType = useGameStore(state => state.stageType);

    const isStage1Active = stageType.find((stage) => stage.stage === "STAGE1")?.active;
    const isStage2Active = stageType.find((stage) => stage.stage === "STAGE2")?.active;

    return (
        <div className="bottom-right-wrapper">
            {isStage1Active && <BoxExample />}
            {isStage2Active && <MushroomInfo/>}
        </div>
    );
}

export default BottomRight