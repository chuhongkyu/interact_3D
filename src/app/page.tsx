import Scene from "@/app/components/webgl/Scene";
import LottieLoading from "@/app/components/view/Lottie";
import IntroViewContainer from "@/app/components/view/intro/IntroViewContainer";
import DiceController from "@/app/components/view/intro/DiceController";
import HandleQueryData from "@/app/components/view/HandleQueryData";

export default function Home() {
  return (
    <main>
      <Scene/>
      <LottieLoading/>
      <IntroViewContainer/>
      <DiceController/>
      <HandleQueryData/>
    </main>
  );
}
