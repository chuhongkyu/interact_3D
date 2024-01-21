import { AnimationMixer } from "three";

export class PlayerStop {
  constructor(info) {

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.castShadow = true
      this.modelMesh.position.y = 0;
      this.modelMesh.rotation.x = 0;
      this.modelMesh.name = "mario";

      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      const idle = glb.animations[1];
      const walk = glb.animations[2];
      const jump = glb.animations[3];
      const run = glb.animations[4];
      const happy = glb.animations[0];

      this.actions[0] = this.mixer.clipAction(idle);
      this.actions[1] = this.mixer.clipAction(walk);
      this.actions[2] = this.mixer.clipAction(jump);
      this.actions[3] = this.mixer.clipAction(run);
      this.actions[4] = this.mixer.clipAction(happy);
      this.actions[0].play();
    });
  }
}
