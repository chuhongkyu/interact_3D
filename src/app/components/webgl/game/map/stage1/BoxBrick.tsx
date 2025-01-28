import { Group, Texture, Vector3Tuple } from "three";
import { Box } from "../Box"
import { PivotControls } from "@react-three/drei";
import { forwardRef, useEffect, useState } from "react";

interface IRoundedBox {
    active: boolean;
    position: Vector3Tuple
}

const BoxBrick = forwardRef<Group, IRoundedBox>(({ active, position }: IRoundedBox, ref) => {
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
            <group ref={ref} onClick={onHandelActive} position={position} dispose={null}>
                <Box/>
            </group>
        </PivotControls>
    )
})

export default BoxBrick