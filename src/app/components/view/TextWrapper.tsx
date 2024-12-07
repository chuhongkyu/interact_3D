"use client"

import { ReactTyped,Typed } from "react-typed";
import { useState, useEffect, useCallback } from "react";
import { introTexts, introTexts2 } from "@/app/utils/textData";
import { useIntroStore } from "@/app/store/useIntroStore";

type CustomHandleType = "Y" | "N"

function TextWrapper() {
    const { introStart, diceNumber, setDiceStart, isDiceStart, textOrder, setTextOrder } = useIntroStore()
    const [typed, setTyped] = useState<Typed| undefined>();
    const [typed2, setTyped2] = useState<Typed| undefined>();
    const [typed3, setTyped3] = useState<Typed| undefined>();
    const [openCustomButton, setOpenCustomButton] = useState(false);

    useEffect(() => {
        if (introStart && typed && textOrder === 1) {
            typed.start();
        }
    }, [introStart, typed, textOrder]);

    useEffect(() => {
        if(textOrder === 3){
            if(typed2){
                typed2.stop();
                typed2.destroy();
            }
        }
    }, [textOrder, typed3, typed2]);

    const handleText1Complete = () => {
        setDiceStart(true)
    }

    const handleCustom = (type: CustomHandleType) => {
        if(type === "Y"){

        }else{
            setTextOrder(3);
        }
    }

    return (
        <>
            {
                textOrder === 1 &&
                <div className="text-container one" style={introStart ? { opacity: 1 } : { opacity: 0 }}>
                    <ReactTyped
                        stopped
                        typedRef={setTyped}
                        strings={introTexts}
                        onComplete={handleText1Complete}
                        typeSpeed={40}
                    />
                </div>
            }
            {
                textOrder === 2 &&
                <div className="text-container two" style={textOrder === 2 ? { opacity: 1 } : { opacity: 0 }}>
                    <ReactTyped
                        typedRef={setTyped2}
                        strings={[
                            `${diceNumber}년 차 개발자의 인생이 궁금하구나???`,
                            `개발자의 인생을 엿보러 가기 전에 옷을 갈아입을 수 있어!`,
                            `옷을 갈아 입을래?`
                        ]}
                        onComplete={()=> setOpenCustomButton(true)}
                        typeSpeed={60}
                    />
                    {openCustomButton &&
                        <div className="text-container__buttons" style={textOrder === 2 ? { opacity: 1 } : { opacity: 0 }}>
                            <button onClick={()=> handleCustom("Y")}>예</button>
                            <button onClick={()=> handleCustom("N")}>아니오</button>
                        </div>
                    }
                </div>
            }
            {
                textOrder === 3 &&
                <div className="text-container three" style={textOrder === 3 ? { opacity: 1 } : { opacity: 0 }}>
                    <ReactTyped
                        startDelay={0.5}
                        typedRef={setTyped3}
                        strings={introTexts2}
                        // onComplete={}
                        typeSpeed={60}
                    />
                </div>
            }
        </>
    );
}

export default TextWrapper;
