import React, { useRef, useEffect, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useIntroStore } from "@/app/store/useIntroStore";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function CameraGroup() {
  const { isLoading, mode } = useIntroStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [ targetPosition, setTargetPosition] = useState<THREE.Vector3>(new THREE.Vector3(0,0.5,0))
  const [ enabled, setEnabled] = useState(true);
  
  useFrame(() => {
    if (cameraRef.current) {
      if(isLoading) return;

      if(mode === "CUSTOM"){
        cameraRef.current.position.lerp(new THREE.Vector3(0, 1, 4), 0.05);
      }else if(mode === "END"){
        cameraRef.current.position.lerp(new THREE.Vector3(0, 1.5, 1.5), 0.01); 
      }else{
        cameraRef.current.position.lerp(new THREE.Vector3(0, 2, 6), 0.05);
      }
    }
  });

  useEffect(()=>{
    if(mode === "CUSTOM"){
      setTargetPosition(new THREE.Vector3(-1,0.5,0))
    }else if(mode === "END"){
      setEnabled(false)
      setTargetPosition(new THREE.Vector3(0,0.5,0))
    }else{
      setTargetPosition(new THREE.Vector3(0,0.5,0))
    }
  },[mode])

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 10, 15]}
        fov={45}
      />
      <OrbitControls
        enabled={enabled}
        makeDefault
        autoRotateSpeed={0.5}
        target={targetPosition}
        zoomSpeed={0.5}
        minDistance={2}
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
