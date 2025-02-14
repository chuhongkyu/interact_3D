import Scene from "@/app/components/webgl/game/Scene";
import BottomRight from "@/app/components/view/game/BottomRight";
import TopRight from "@/app/components/view/game/TopRight";
import BottomLeft from "../components/view/game/BottomLeft";

export default function Page() {
  return (
    <main>
      <TopRight/>
      <Scene/>
      <BottomRight/>
      <BottomLeft/>
    </main>
  );
}
  