import * as THREE from "three";

export class OldWorld {
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

                this.modelMesh.traverse(child => {
					if (child.isMesh) {
						 // 흰색으로 설정
						child.material.emissive.set(0xffffff); // 발광 색상을 흰색으로 설정
						child.material.emissiveIntensity = 0.3; // 발광 강도를 1로 설정
					}
				});

				info.scene.add(this.modelMesh);
			}
		);
	}
}