"use client";

import Lottie from "react-lottie-player"
import json from "./animation_ll0vjanv.json";

function LottieLoading() {
  return (
    <div className="loading">
        <Lottie
            loop
            animationData={json}
            play
            style={{ width: 300, height: 300 }}
        />
	</div>
  )
}

export default LottieLoading