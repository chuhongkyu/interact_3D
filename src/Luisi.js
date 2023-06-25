import { AnimationMixer } from "three";

export class Luisi {
  constructor(info) {
    this.moving = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.y = 1.4;
      this.modelMesh.position.x = 5;
      this.modelMesh.position.z = 8;
      this.modelMesh.rotation.y = 3;
      this.modelMesh.name = "luisi";
      this.modelMesh.scale.set(0.5,0.5,0.5)

      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      const idle = glb.animations[0];
      const walk = glb.animations[1];

      this.actions[0] = this.mixer.clipAction(idle);
      this.actions[1] = this.mixer.clipAction(walk);
      this.actions[0].play();
    });
  }
}
