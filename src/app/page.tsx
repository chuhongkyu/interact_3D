import Scene from "@/app/components/webgl/Scene";
import LottieLoading from "./components/view/Lottie";
import IntroTextWrapper from "./components/view/intro/IntroTextWrapper";

export default function Home() {
  return (
    <main>
      <Scene/>
      <LottieLoading/>
      <IntroTextWrapper/>
    </main>
  );
}
