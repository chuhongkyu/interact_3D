import { useMemo, useRef } from "react";
import { Euler, Group, Quaternion, Vector3 } from "three";
import { Line, OrbitControls } from "@react-three/drei";
import Item from "./Item";

function GizmoController() {
    const r = 2 * 0.65;
    const itemRef = useRef<Group>(null); // Item을 참조

    const arc360 = useMemo(() => {
        const segments = 32;
        const points: Vector3[] = [];
        for (let j = 0; j <= segments; j++) {
            const angle = (j * 2 * Math.PI) / segments;
            points.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0));
        }
        return points;
    }, [r]);

    // 축을 클릭할 때 상대적인 회전 추가
    const handleAxisClick = (axis: "x" | "y" | "z") => {
        if (!itemRef.current) return;

        // 현재 로컬 로테이션(Euler) 가져오기
        const currentRotation = itemRef.current.rotation.clone();

        // 클릭한 축에 대해 회전 추가 (45도)
        const deltaRotation = new Euler(
            axis === "x" ? Math.PI / 8 : 0,
            axis === "y" ? Math.PI / 8 : 0,
            axis === "z" ? Math.PI / 8 : 0
        );

        // 현재 로테이션과 새로운 회전을 합성
        const currentQuaternion = new Quaternion().setFromEuler(currentRotation);
        const deltaQuaternion = new Quaternion().setFromEuler(deltaRotation);
        currentQuaternion.multiply(deltaQuaternion);

        // 새로운 쿼터니언을 Euler로 변환하여 적용
        const newRotation = new Euler().setFromQuaternion(currentQuaternion);
        itemRef.current.rotation.copy(newRotation);
    };

    return (
        <>
            <Item ref={itemRef} />
            <group>
                <Line
                    name="x"
                    rotation={[-Math.PI / 2, 0, 0]}
                    transparent
                    points={arc360}
                    lineWidth={5}
                    color={"red"}
                    opacity={1}
                    depthTest={false}
                    onClick={() => handleAxisClick("x")}
                />
                <Line
                    name="y"
                    rotation={[0, Math.PI / 2, 0]}
                    transparent
                    points={arc360}
                    lineWidth={5}
                    color={"orange"}
                    opacity={1}
                    depthTest={false}
                    onClick={() => handleAxisClick("y")}
                />
                <Line
                    name="z"
                    transparent
                    points={arc360}
                    lineWidth={5}
                    color={"blue"}
                    opacity={1}
                    depthTest={false}
                    onClick={() => handleAxisClick("z")}
                />
            </group>
        </>
    );
}

export default GizmoController;