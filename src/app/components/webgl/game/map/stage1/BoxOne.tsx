import { RoundedBox } from "@react-three/drei"
import { Texture, Vector2Tuple, Vector3Tuple } from "three"

interface IRoundedBox {
    texture: Texture;
    position: Vector3Tuple
}

function BoxOne({texture, position}:IRoundedBox) {
    return (
        <group position={position} dispose={null}>
            <RoundedBox
                args={[1,1,1]}
                radius={0.05}
                smoothness={4}
                bevelSegments={4}
                creaseAngle={0.4}
                castShadow
                receiveShadow
                >
                <meshMatcapMaterial matcap={texture} />
            </RoundedBox>
        </group>
    )
}

export default BoxOne