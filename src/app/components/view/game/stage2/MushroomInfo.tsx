import { useGameStore } from "@/app/store/useGameStore";
import { stage2 } from "@/app/utils/gameData"

function MushroomInfo() {
    const stage2Count = useGameStore(state => state.stage2Count);
    return (
        <div className="ui-stage-2">
            <div className="mushroom-example-wrapper">
                <div className="mushroom-info">
                    <span className="info">
                        <img src="/assets/images/life.png" alt="mushroom"/>
                    </span>
                    <b>{stage2Count}</b>/<p>{stage2.problem}</p>
                </div>
            </div>
        </div>
    )
}

export default MushroomInfo