import * as THREE from "three";
import { Stage1 } from "../modeljs/Stage1";
import GrassField from "./GrassField";

export function Stage1Spot(gltfLoader, fontLoader, fontUrl, scene, meshes){
    const x = -9;
    const z = 8;

    const stage1model = new Stage1({
        gltfLoader, scene, modelSrc: "./assets/models/stage1.glb",
        x: x + 1, y: -4, z: z -1.5,
    });

    const stage1Position = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 5),
        new THREE.MeshStandardMaterial({
            color: "green",
            transparent: true,
            opacity: 0.1,
        })
    );
    stage1Position.position.set(x, 0.005, Math.abs(z));
    stage1Position.rotation.x = -Math.PI / 2;
    stage1Position.receiveShadow = true;

    const grassField = new GrassField({ 
        count: 60, 
        width: 5.5, 
        height: 5,
        x: x + 0.5,
        y: 0.7,
        z: Math.abs(z),
    });

    scene.add(stage1Position); 
    grassField.addToScene(scene);

    return {stage1Position, stage1model, grassField}
}