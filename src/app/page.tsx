import Scene from "@/app/components/webgl/Scene";
import LottieLoading from "./components/view/Lottie";
import IntroTextWrapper from "./components/view/intro/IntroTextWrapper";
import DiceController from "./components/view/intro/DiceController";

export default function Home() {
  return (
    <main>
      <Scene/>
      <LottieLoading/>
      <IntroTextWrapper/>
      <DiceController/>
    </main>
  );
}
