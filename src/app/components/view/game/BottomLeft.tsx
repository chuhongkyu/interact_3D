"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

function BottomLeft() {
    const [open, setOpen] = useState(false);

    return (
        <div className="bottom-left-wrapper">
            <span className="info-icon" onClick={()=> setOpen(!open)}>
                <img src="assets/images/info.svg" alt="icon"/>
                <AnimatePresence>
                    {open && 
                    (
                        <motion.div 
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0, opacity: 0}}
                            className="info-container">
                            <span>
                                <p><b>조작 법 :</b> 터치 또는 마우스 클릭으로 마리오를 움직이세요.</p>
                                <p><b>버섯 획득 :</b> 이벤트 칸을 클리어 하면 버섯을 획득 할 수 있어요.</p>
                                <p><b>이벤트 칸 :</b> 이벤트 칸이라고 해서 전부 버섯을 주지는 않아요~😝</p>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </span>
        </div>
    )
}

export default BottomLeft