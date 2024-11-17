import * as THREE from 'three';
import gsap from 'gsap/gsap-core';

export function createScene() {
    let renderer, scene, camera, cubeCamera;

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.getElementById('three-canvas').appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();
	// camera
	camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 0, 5, 10 );

    // cubeCamera
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256 );
	cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );
	const genCubeUrls = function ( prefix, postfix ) {
		return [
			prefix + 'px' + postfix, prefix + 'nx' + postfix,
			prefix + 'py' + postfix, prefix + 'ny' + postfix,
			prefix + 'pz' + postfix, prefix + 'nz' + postfix
		];
	};
    const urls = genCubeUrls( './assets/images/sky/', '.png' );
	new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {
		scene.background = cubeTexture;
		cubeCamera.update( renderer, scene );
		renderer.render( scene, camera );
	} );

    //빛
	const directionaLight = new THREE.DirectionalLight(0xffffff, 2.5);
	directionaLight.castShadow = true;

	directionaLight.shadow.mapSize.width = 1048;
	directionaLight.shadow.mapSize.height = 1048;

	directionaLight.shadow.camera.near = 1;
	directionaLight.shadow.camera.far = 100;
	directionaLight.shadow.camera.left = -10;
	directionaLight.shadow.camera.right = 10;
	directionaLight.shadow.camera.top = 10;
	directionaLight.shadow.camera.bottom = -10;

	directionaLight.shadow.bias = -0.005;

	directionaLight.position.set(1,3,3)

	scene.add(directionaLight);
	const ambientLight = new THREE.AmbientLight("white", 2);
	scene.add(ambientLight);

	// const lightHelper = new THREE.DirectionalLightHelper(directionaLight, 5, 0x000000); 
	// scene.add(lightHelper);

    // resize
    window.addEventListener('resize', ()=> onWindowResize(renderer, scene, camera))
   
    return { renderer, scene, camera};
}


export function onWindowResize(renderer, scene, camera) {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render( scene, camera );
}


export function handleMouseWheel(event, camera) {
	const currentZ = camera.position.z;
	const delta = event.deltaY;

	let newZ = currentZ + delta * 0.01;

	newZ = Math.min(3, Math.max(2, newZ));
	gsap.to(camera.position, {
		duration: 2,
		y: 1,
		z: newZ,
	});
}