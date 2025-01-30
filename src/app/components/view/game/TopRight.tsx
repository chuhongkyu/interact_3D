"use client"

import { useGameStore } from "@/app/store/useGameStore";

function TopRight() {
    const stageType = useGameStore(state => state.stageType);

    return (
        <div className="top-right-wrapper">
            <div className="life-wrapper">
                <span className={`${stageType[0].clear ? "active": ""}`}>
                    <img src="/assets/images/life.png" alt="life"/>
                </span>
                <span className={`${stageType[1].clear ? "active": ""}`}>
                    <img src="/assets/images/life.png" alt="life"/>
                </span>
                <span className={`${stageType[2].clear ? "active": ""}`}>
                    <img src="/assets/images/life.png" alt="life"/>
                </span>
            </div>
        </div>
    )
}

export default TopRight