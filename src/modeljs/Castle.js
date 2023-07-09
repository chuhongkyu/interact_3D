export class Castle {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;

		this.visible = true;
		this.modelMesh = null; 

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.scale.set(0.1,0.1,0.1)
				// info.scene.add(this.modelMesh);
				if (this.visible) {
					info.scene.add(this.modelMesh); // visible이 true인 경우에만 scene에 추가
				}
			}
		);
	}
}
