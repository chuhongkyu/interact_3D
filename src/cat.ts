import { AnimationMixer } from "three";

export class Cat {
  constructor(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;

    this.visible = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      this.modelMesh = glb.scene.children[0];
      //자식 그림자
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.modelMesh.position.set(this.x, this.y, this.z);
      this.modelMesh.scale.set(0.2, 0.2, 0.2);
      info.scene.add(this.modelMesh);
    });
  }
}
