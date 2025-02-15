"use client"

import { useEffect, useRef } from "react";
import { useGameStore } from "@/app/store/useGameStore";
import introJs from "intro.js";
import "intro.js/introjs.css";

function TopRight() {
    const stageType = useGameStore(state => state.stageType);
    const playerState = useGameStore(state => state.playerState);
    const isFirstGame = useGameStore(state => state.isFirstGame);
    const setIsFirstGame = useGameStore(state => state.setIsFirstGame);

    useEffect(() => {
        if (playerState === "DEFAULT" && isFirstGame) {

            const intro = introJs();
            intro.setOptions({
                steps: [
                    { element: ".top-right-wrapper", intro: "게임에서 모아야 하는 버섯을 표시하는 UI입니다." },
                    { element: ".life-wrapper", intro: "이벤트들을 클리어하면 버섯을 획득할 수 있습니다!" }
                ],
                showBullets: false,
            });
            intro.start();

            intro.oncomplete(()=> setIsFirstGame(false));
            intro.onexit(()=> setIsFirstGame(false));
        }
    }, [isFirstGame, playerState, setIsFirstGame]); 

    if (playerState === "LOADING") return null;

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
    );
}

export default TopRight;
