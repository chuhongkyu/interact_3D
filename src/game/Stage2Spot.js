import * as THREE from "three";
import { Basic } from "../modeljs/Basic";

export function Stage2Spot(gltfLoader, fontLoader, fontUrl, scene, meshes){
    //stage2
    const x = 8;
    const z = -6;

    const stage2model = new Basic({
        gltfLoader, scene, modelSrc: "./assets/models/All.glb",
        x: x + 1.5, y: -3, z: z,
        scale: { x: 0.2, y: 0.2, z: 0.2 },
        rotation: {x: 0, y: 2, z: 0 }
    });

    //stage2
    const stage2Position = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshStandardMaterial({
            color: "blue",
            transparent: true,
            opacity: 0.3,
        })
    );
    stage2Position.position.set(x + 2, 0.005, z + 2);
    stage2Position.rotation.x = -Math.PI / 2;
    stage2Position.receiveShadow = true;

    scene.add(stage2Position);  

    return { stage2model, stage2Position }
}