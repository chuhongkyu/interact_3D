import * as THREE from "three";
export class World {
	constructor(info) {
	  this.x = info.x || 0;
	  this.y = info.y || 0;
	  this.z = info.z || 0;
	  this.scale = info.scale || { x: 1, y: 1, z: 1 };
	  this.rotation = info.rotation || { x: 0, y: 3, z: 0 };
  
	  info.gltfLoader.load(info.modelSrc, (glb) => {
		this.modelMesh = glb.scene;
  
		this.modelMesh.traverse((child) => {
		  if (child.isMesh) {
			// child.castShadow = true;
			child.receiveShadow = true;
		  }
		});

		this.modelMesh.position.set(this.x, this.y, this.z);
		this.modelMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
		this.modelMesh.scale.set(this.scale.x, this.scale.y, this.scale.z);
  
		info.scene.add(this.modelMesh);
	  });
	}
  }
  