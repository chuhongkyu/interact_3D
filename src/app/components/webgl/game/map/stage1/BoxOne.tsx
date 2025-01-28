import { PivotControls, RoundedBox } from "@react-three/drei"
import { forwardRef, useEffect, useState } from "react";
import { Group, Texture, Vector2Tuple, Vector3Tuple } from "three"

interface IRoundedBox {
    active: boolean;
    texture: Texture;
    position: Vector3Tuple
}

const BoxOne = forwardRef<Group, IRoundedBox>(({active, texture, position }: IRoundedBox, ref) => {
    const [isActive, setActive] = useState(false);

    const onHandelActive = () => {
        if(active) return;
        setActive(!isActive);
    }

    useEffect(()=>{
        if(active){
            setActive(false)
        }
    },[active])

    return (
        <PivotControls
            disableScaling
            disableRotations
            depthTest={false}
            anchor={[0,0,0]}
            enabled={isActive}
            visible={isActive}
            translationLimits={[[-5,5],[0,1.5],[-5,5]]}
            >
            <group onClick={onHandelActive} ref={ref} position={position} dispose={null}>
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
        </PivotControls>
    )
})

export default BoxOne