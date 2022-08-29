import { AnimationMixer } from "three";

export class Mario {
  constructor(info) {
    this.moving = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.y = 0.3;
      this.modelMesh.position.x = -5;
      this.modelMesh.name = "plane";
      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.mixer = new AnimationMixer(this.modelMesh);
      this.actions = this.mixer.clipAction(glb.animations[0]);
      this.actions.play();
    });
  }
}
