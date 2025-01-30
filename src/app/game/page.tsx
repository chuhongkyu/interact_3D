import Scene from "@/app/components/webgl/game/Scene";
import BottomRight from "@/app/components/view/game/BottomRight";
import TopRight from "@/app/components/view/game/TopRight";

export default function Page() {
  return (
    <main>
      <TopRight/>
      <Scene/>
      <BottomRight/>
    </main>
  );
}
  