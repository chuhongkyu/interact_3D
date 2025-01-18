import { OrbitControls, View } from "@react-three/drei"
import Lights from "../Lights"
import { Suspense } from "react"
import { Box } from "../map/Box"

function UserView() {
    return (
        <View className="view-scene">
            <Lights />
            <color attach="background" args={["#ffffff"]} />
            <Suspense fallback={<></>}>
                <OrbitControls
                    makeDefault
                    zoomSpeed={0.5}
                    minDistance={2}
                    maxDistance={20}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    />
                <Box/>
            </Suspense>
        </View>
    )
}

export default UserView