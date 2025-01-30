import React from "react";
import { useBox } from "@react-three/cannon";
import { Mesh } from "three";

export function GameBox() {
  // 바닥
  const [floorRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 1, 8],
    position: [0, -0.5, 0],
  }));

  // 왼쪽 벽
  const [leftWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [1, 8, 8],
    position: [-4.5, 4, 0],
  }));

  // 오른쪽 벽
  const [rightWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [1, 8, 8],
    position: [4.5, 4, 0],
  }));

  // 앞쪽 벽
  const [frontWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 8, 1],
    position: [0, 4, -4.5],
  }));

  // 뒤쪽 벽
  const [backWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 8, 1],
    position: [0, 4, 4.5],
  }));

  return (
    <group>
      {/* 바닥 */}
      <mesh ref={floorRef}>
        <boxGeometry args={[8, 1, 8]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh ref={leftWallRef}>
        <boxGeometry args={[1, 8, 8]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* 오른쪽 벽 */}
      <mesh ref={rightWallRef}>
        <boxGeometry args={[1, 8, 8]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* 앞쪽 벽 */}
      <mesh ref={frontWallRef}>
        <boxGeometry args={[8, 8, 1]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* 뒤쪽 벽 */}
      <mesh ref={backWallRef}>
        <boxGeometry args={[8, 8, 1]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>
    </group>
  );
}
