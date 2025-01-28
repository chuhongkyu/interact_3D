"use client"

import { useGameStore } from "@/app/store/useGameStore"
import BoxExample from "./stage1/BoxExample";

function BottomUI() {
    const stageType = useGameStore(state => state.stageType);

    const isStage1Active = stageType.find((stage) => stage.stage === "STAGE1")?.active;

    return (
        <div className="bottom-ui-wrapper">
            {isStage1Active && <BoxExample />}
        </div>
    );
}

export default BottomUI