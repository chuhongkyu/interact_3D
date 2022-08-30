import { AnimationMixer, THREE } from "three";

interface Info {
  scene: THREE.Scene;
  meshes: THREE.Mesh;
  gltfLoader: THREE.GLTFLoader;
  modelSrc: string;
}

export class Player {
  moving: Boolean;
  actions: [];

  constructor(info: Info) {
    this.moving = false;
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.y = 0.3;
      this.modelMesh.name = "ilbuni";
      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);
      console.log(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[0].play();
    });
  }
}
