import React, { useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { Mesh, TextureLoader } from "three";

export function GameBox() {
  const matcapTexture = useMemo(() => {
      const textureLoader = new TextureLoader();
      return textureLoader.load("/assets/matcap/orange.png");
  }, []);

  // 바닥
  const [floorRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 1, 5],
    position: [0, -0.5, 2],
  }));

  // 왼쪽 벽
  const [leftWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [1, 8, 5],
    position: [-4.5, 4, 2],
  }));

  // 오른쪽 벽
  const [rightWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [1, 8, 5],
    position: [4.5, 4, 2],
  }));

  // 앞쪽 벽
  const [frontWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 8, 1],
    position: [0, 4, -1],
  }));

  // 뒤쪽 벽
  const [backWallRef] = useBox<Mesh>(() => ({
    type: "Static",
    args: [8, 8, 1],
    position: [0, 4, 5],
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

      {/* <mesh castShadow receiveShadow position={[-4.5,0,2]}>
        <boxGeometry args={[1, 1.5, 5]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh> */}

      {/* 오른쪽 벽 */}
      <mesh ref={rightWallRef}>
        <boxGeometry args={[1, 1, 5]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* <mesh castShadow receiveShadow position={[4.5,0,2]}>
        <boxGeometry args={[1, 1.5, 5]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh> */}

      {/* 앞쪽 벽 */}
      <mesh ref={frontWallRef}>
        <boxGeometry args={[8, 8, 1]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* <mesh castShadow receiveShadow position={[0,0,5]}>
        <boxGeometry args={[8, 1.5, 1]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh> */}

      {/* 뒤쪽 벽 */}
      <mesh ref={backWallRef}>
        <boxGeometry args={[8, 8, 1]} />
        <meshStandardMaterial visible={false} color="#000" />
      </mesh>

      {/* <mesh castShadow receiveShadow position={[0,0,-1]}>
        <boxGeometry args={[8, 1.5, 1]} />
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh> */}
    </group>
  );
}
