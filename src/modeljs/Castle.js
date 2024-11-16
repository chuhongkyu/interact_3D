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
				this.modelMesh.receiveShadow = true
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.scale.set(0.1,0.1,0.1)
				// info.scene.add(this.modelMesh);
				this.modelMesh.traverse((child) => {
					if (child.isMesh) {
					  child.castShadow = true;
					  child.receiveShadow = true;
					}
				  });
				info.scene.add(this.modelMesh);
			}
		);
	}
}
