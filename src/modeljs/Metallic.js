import { AnimationMixer } from "three";

export class Metallic {
  constructor(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;
    this.scale = info.scale || { x: 1, y: 1, z: 1 };
    this.rotation = info.rotation || { x: 0, y: 0, z: 0 };
    this.visible = false;

    info.gltfLoader.load(info.modelSrc, glb => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.castShadow = true;
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.modelMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
      this.modelMesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
      info.scene.add(this.modelMesh);
      
      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      const idle = glb.animations[0];
      const rotate = glb.animations[1];

      this.actions[0] = this.mixer.clipAction(idle);
      this.actions[1] = this.mixer.clipAction(rotate);
      
      }
    );
  }
}
