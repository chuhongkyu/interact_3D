import * as THREE from "three";
import { createText } from "../components/Text";
import { Basic } from "../modeljs/Basic";

export function TurtleSpot( gltfLoader, fontLoader, fontUrl, scene, meshes){
    const x = 10;
    const z = 5;

    const turtle = new Basic({
        scene, meshes, gltfLoader, modelSrc: "./assets/models/turtle.glb",
        x: x, y: 0.6, z: z,
        scale: { x: 0.6, y: 0.6, z: 0.6 },
    });

    const turtlePosition = new THREE.Mesh(
        new THREE.CircleGeometry(1, 32),
        new THREE.MeshStandardMaterial({
            transparent: true,
            color: "blue",
            opacity: 0.2,
        })
    );
    turtlePosition.position.set(x, 0.01, z);
    turtlePosition.rotation.x = -Math.PI / 2;
    turtlePosition.receiveShadow = true;

    scene.add(turtlePosition);
    // meshes.push(turtlePosition);

    fontLoader.load(fontUrl, function (font) {
        createText(scene, font, ['거북이?'], {x: x + 0.4, y: 1.2, z: z + 3})
    });

    return { turtle, turtlePosition }
}