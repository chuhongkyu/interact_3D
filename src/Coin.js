import { AnimationMixer, LoopOnce, AnimationClip } from "three";

export class Coin {
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
				this.modelMesh.scale.set(0.2,0.2,0.2)
				info.scene.add(this.modelMesh);

				const animations = glb.animations;
				if (animations && animations.length) {
				const mixer = new AnimationMixer(this.modelMesh);
				animations.forEach(clip => {
					const action = mixer.clipAction(clip);
					action.setLoop(LoopOnce, 1);
					action.clampWhenFinished = true;
					action.play();
				});
				info.mixers.push(mixer);
				}
			}
		);
	}
}
