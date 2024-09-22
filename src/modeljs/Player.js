import { AnimationMixer, SkeletonHelper } from "three";
import { getParams } from "../utils/helper";


export class Player {
  constructor(info) {
    this.moving = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene.children[0];
      this.modelMesh.position.y = 0;
      this.modelMesh.rotation.x = 0;
      this.modelMesh.name = "mario";

      info.scene.add(this.modelMesh);
      info.meshes.push(this.modelMesh);

      if(getParams("test")){
        const skeletonHelper = new SkeletonHelper(this.modelMesh);
        info.scene.add(skeletonHelper);

        this.modelMesh.traverse((child) => {
          if (child.type === "Bone") {
            console.log(`Bone found: ${child.name}`, child);
          }
        });
      }

      this.handBone = this.modelMesh.getObjectByName('mixamorigLeftHand_010');

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

  addMushroom(gltfLoader, mushroomModelSrc) {
    gltfLoader.load(mushroomModelSrc, (mushroomGlb) => {
      const mushroom = mushroomGlb.scene;
      mushroom.scale.set(0.5, 0.5, 0.5);
      mushroom.position.set(0, 0, 0);

      if (this.handBone) {
        this.handBone.add(mushroom);
        // console.log('Mushroom added to hand');
      } else {
        // console.error('Hand bone not found!');
      }
    });
  }
}
