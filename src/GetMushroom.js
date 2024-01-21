import { AnimationMixer } from "three";

export class Mushroom {
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

      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      const idle = glb.animations[0];
      const walk = glb.animations[1];

      this.actions[0] = this.mixer.clipAction(idle);
    //   this.actions[1] = this.mixer.clipAction(walk);
      this.actions[0].play();
    });
  }
}

export function getMushroom(){
    
}