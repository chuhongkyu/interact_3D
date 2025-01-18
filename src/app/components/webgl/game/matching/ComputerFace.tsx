import { PerspectiveCamera, View } from "@react-three/drei"
import Lights from "./Lights"
import { Suspense } from "react"
import { Oirow } from "../npc/Oirow"

function ComputerFace() {
    return (
        <View className="view-scene-wario">
            <Lights/>
            <Suspense fallback={<></>}>
                <PerspectiveCamera makeDefault fov={45} position={[0,1,2]}/>
                <Oirow/>
            </Suspense>
        </View>
    )
}

export default ComputerFace