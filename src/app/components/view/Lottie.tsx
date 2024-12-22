"use client";

import Lottie from "react-lottie-player"
import json from "./animation_ll0vjanv.json";
import { useIntroStore } from "@/app/store/useIntroStore";
import { useEffect } from "react";

function LottieLoading() {
  const { isLoading, setMode, mode } = useIntroStore()

  useEffect(()=> {
    let timeout: number | null = null;

    if(!isLoading){
      // 로티 애니메이션 css 끝이 1초임
      timeout =  window.setTimeout(()=> setMode("INTRO"),  1000)
    }

    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
  },[isLoading])

  return (
    <div className={`loading ${mode === "END" && "black"}`}>
      {mode === "DEFAULT" && (
        <Lottie
          loop
          animationData={json}
          play
          style={{ width: 300, height: 300 }}
        />
      )}
      
	  </div>
  )
}

export default LottieLoading