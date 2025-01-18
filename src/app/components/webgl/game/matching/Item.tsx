import React from "react";
import { Group } from "three";

const Item = React.forwardRef<Group, JSX.IntrinsicElements["group"]>(
    (props, ref) => {
        return (
            <group ref={ref} {...props}>
                <mesh receiveShadow castShadow rotation={[0.1,0.2,0]} position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={"orange"} />
                </mesh>
            </group>
        );
    }
);

export default Item;