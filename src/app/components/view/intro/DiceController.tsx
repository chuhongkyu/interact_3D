"use client"

import { useIntroStore } from "@/app/store/useIntroStore"
import { useQueryDataStore } from "@/app/store/useQueryData";
import { useEffect } from "react";
import { LoopOnce } from "three";

function DiceController() {
    const { actions, diceNumber, textOrder, increaseDiceNumber, decreaseDiceNumber } = useIntroStore()
    const { setCareer } = useQueryDataStore();
    
    useEffect(() => {
        if (actions) {
            const jumpAction = actions["Jump"];
            const defaultAction = actions["Idle"];

            if (jumpAction && defaultAction) {
                jumpAction.getMixer().addEventListener("finished", () => {
                    defaultAction.reset().play();
                });
            }
        }
    }, [actions]);

    const onClick = () => {
        const jumpAction = actions["Jump"];
        const defaultAction = actions["Idle"];

        defaultAction?.stop();
        if (jumpAction) {
            jumpAction.reset();
            jumpAction.setLoop(LoopOnce, 0);
            jumpAction.clampWhenFinished = true;
            jumpAction.play();
        }

        setCareer(diceNumber + "");
    };

    
    return (
        <div className={`${textOrder === 1 ? "active":""} ui-btns`}>
            {/* <div className="dice-display"></div> */}
            <div className="arrow">
                <button onClick={increaseDiceNumber} className="btn up"><img src="assets/images/up.png" alt="up"/></button>
                <button onClick={decreaseDiceNumber} className="btn down"><img src="assets/images/up.png" alt="down"/></button>
            </div>
            <button onClick={onClick} className="jump">선택</button>
        </div>
    )
}

export default DiceController