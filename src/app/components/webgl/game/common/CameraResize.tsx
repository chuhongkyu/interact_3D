import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react'
import { OrthographicCamera } from 'three';

function CameraResize() {
    const { camera, gl } = useThree();

    useEffect(() => {
        const updateCamera = () => {
            const aspectRatio = window.innerWidth / window.innerHeight;
            const orthoCamera = camera as OrthographicCamera;

            orthoCamera.left = -aspectRatio;
            orthoCamera.right = aspectRatio;
            orthoCamera.top = 1;
            orthoCamera.bottom = -1;
            orthoCamera.zoom = 0.25;
            orthoCamera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        updateCamera();

        window.addEventListener("resize", updateCamera);

        return () => {
            window.removeEventListener("resize", updateCamera);
        };
    }, [camera, gl]);

    return (
        <></>
    )
}

export default CameraResize