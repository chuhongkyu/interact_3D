import { AnimationMixer } from "three";

export class Plant {
  constructor(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;

    this.moving = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.modelMesh.rotation.z = 0;
      this.modelMesh.scale.set(0.7,0.7,0.7)

      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      const idle = glb.animations[0];

      this.actions[0] = this.mixer.clipAction(idle);
      this.actions[0].play();
    });
  }
}
