import * as THREE from "three";

export function Ground(scene, meshes){
    const textureLoader = new THREE.TextureLoader();

    const floorTexture = textureLoader.load("./assets/images/bg.png");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 4;
    floorTexture.repeat.y = 4;

    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshStandardMaterial({
            map: floorTexture,
        })
    );
    floorMesh.name = "floor";
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;

    const rockFloorTexture = textureLoader.load("./assets/images/bg2.jpg");
    rockFloorTexture.wrapS = THREE.RepeatWrapping;
    rockFloorTexture.wrapT = THREE.RepeatWrapping;
    rockFloorTexture.repeat.x = 1;
    rockFloorTexture.repeat.y = 2;

    const rockFloorTextureStart = textureLoader.load("./assets/images/bg3.jpg");
    const rockFloorTextureEnd = textureLoader.load("./assets/images/bg3.jpg");

    const rockFloorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 9),
        new THREE.MeshStandardMaterial({
            map: rockFloorTexture,
        })
    );
    rockFloorMesh.name = "floor";
    rockFloorMesh.position.z = -11.5
    rockFloorMesh.position.y = 0.01
    rockFloorMesh.rotation.x = -Math.PI / 2;
    rockFloorMesh.receiveShadow = true;
    
    const rockFloorMeshStart = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshStandardMaterial({
            map: rockFloorTextureStart,
        })
    );
    rockFloorMeshStart.name = "floor";
    rockFloorMeshStart.rotation.x = -Math.PI / 2;
    rockFloorMeshStart.position.y = 0.01
    rockFloorMeshStart.position.z = -5
    rockFloorMeshStart.receiveShadow = true;
    
    const rockFloorMeshEnd = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshStandardMaterial({
            map: rockFloorTextureEnd,
        })
    );
    
    rockFloorMeshEnd.name = "floor";
    rockFloorMeshEnd.position.x = 0.1
    rockFloorMeshEnd.position.y = 0.01
    rockFloorMeshEnd.position.z = -18
    rockFloorMeshEnd.rotation.x = -Math.PI / 2;
    rockFloorMeshEnd.rotation.z = Math.PI
    rockFloorMeshEnd.receiveShadow = true;

    scene.add(floorMesh);
    scene.add(rockFloorMesh);
    scene.add(rockFloorMeshEnd);
    scene.add(rockFloorMeshStart);

    meshes.push(floorMesh);
    meshes.push(rockFloorMesh);
}