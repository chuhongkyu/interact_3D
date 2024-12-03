"use client"

import { ReactTyped,Typed } from "react-typed";
import { useState, useEffect } from "react";
import { ITextWrapperProps } from "@/app/types/viewType";

function TextWrapper({text, start, cb}: ITextWrapperProps) {
    const [typed, setTyped] = useState<Typed| undefined>()

    useEffect(()=>{
        if(start && typed){
            typed.start();
        }
    },[start, typed])

    return (
        <div className="text-container" style={ start ? { opacity: 1} : {opacity: 0}}>
            <ReactTyped
                stopped
                typedRef={setTyped}
                strings={text}
                onComplete={()=> {cb && cb()}}
                typeSpeed={40}
            />
        </div>
    )
}

export default TextWrapper