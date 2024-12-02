import React, { useRef, useEffect, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useIntroStore } from "@/app/store/useIntroStore";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CameraGroup() {
  const { isLoading } = useIntroStore();
  const cameraRef = useRef<any>(null);
  const [targetPosition, setTargetPosition] = useState([0, 4, 8]);

  useEffect(() => {
    if (!isLoading) {
      setTargetPosition([0, 2, 6]);
    } else {
      setTargetPosition([0, 10, 15]);
    }
  }, [isLoading]);

  useFrame(() => {
    if (cameraRef.current && !isLoading) {
        cameraRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.05);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 10, 15]}
        fov={45}
      />

      <OrbitControls
        makeDefault
        autoRotateSpeed={0.5}
        zoomSpeed={0.5}
        minDistance={5}
        maxDistance={20}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
      />
    </>
  );
}

export default CameraGroup;
