"use client"

import { useIntroStore } from "@/app/store/useIntroStore"

function DiceController() {
    const { textOrder, increaseDiceNumber, decreaseDiceNumber } = useIntroStore()

    return (
        <div className={`${textOrder === 1 ? "active":""} ui-btns`}>
            {/* <div className="dice-display"></div> */}
            <div className="arrow">
                <button onClick={increaseDiceNumber} className="btn up"><img src="assets/images/up.png" alt="up"/></button>
                <button onClick={decreaseDiceNumber} className="btn down"><img src="assets/images/up.png" alt="down"/></button>
            </div>
            <div className="jump">선택</div>
        </div>
    )
}

export default DiceController