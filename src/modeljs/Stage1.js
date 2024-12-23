import * as THREE from "three";

export class Stage1 {
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
				this.modelMesh.scale.set(0.06, 0.06, 0.06);

				info.scene.add(this.modelMesh);
			}
		);
	}
}