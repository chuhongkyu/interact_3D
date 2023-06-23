import { AnimationMixer } from "three";

export class KinBoo {
    constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;

		this.visible = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.rotation.z = 1;
				this.modelMesh.scale.set(0.6,0.6,0.6)
				info.scene.add(this.modelMesh);
			}
		);
	}
}
