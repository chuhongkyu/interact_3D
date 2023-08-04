export class Intro {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		this.scale = info.scale || { x: 1, y: 1, z: 1 };
		this.rotation = info.rotation || { x: 0, y: 3, z: 0 };

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
				this.modelMesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
				info.scene.add(this.modelMesh);
			}
		);
	}
}