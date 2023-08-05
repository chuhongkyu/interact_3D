import * as THREE from 'three';
import { PlayerStop } from './modeljs/PlayerStop';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from 'gsap/gsap-core';
import { Intro } from './modeljs/Intro';
import Typed from 'typed.js';
import { Metallic } from './modeljs/Metallic';

let renderer, scene, camera, cubeCamera;

init();

function init() {
	const gltfLoader = new GLTFLoader();
	const meshes = [];

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('three-js').appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();
	// camera
	camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 100 );

	const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 256 );
	cubeCamera = new THREE.CubeCamera( 1, 1000, cubeRenderTarget );

	camera.position.set( 0, 10, 30 );

	// controls.addEventListener( 'change', render );
	// controls.minDistance = 10;
	// controls.maxDistance = 50;
	// controls.minZoom = 1;
	// controls.maxZoom = 1;
	// controls.enableRotate = false;

	const genCubeUrls = function ( prefix, postfix ) {
		return [
			prefix + 'px' + postfix, prefix + 'nx' + postfix,
			prefix + 'py' + postfix, prefix + 'ny' + postfix,
			prefix + 'pz' + postfix, prefix + 'nz' + postfix
		];
	};

	const player = new PlayerStop({
		scene, meshes, gltfLoader, modelSrc: "./models/mario_really.glb",
	});

	const world = new Intro({
		gltfLoader, scene, modelSrc: "./models/world-intro.glb",
		x: 0, y: 0, z: 0,
		scale: { x: 0.2, y: 0.2, z: 0.2 }
	});

	scene.add(world)

	const urls = genCubeUrls( './images/sky/', '.png' );

	new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {
		scene.background = cubeTexture;
		cubeCamera.update( renderer, scene );
		render();
	} );

	const dice = new Metallic({
		gltfLoader, scene, modelSrc: "./models/dice.glb",
		x: 3, y: 1, z: -1,
		scale: { x: 0.02, y: 0.02, z: 0.02 }
	});

	const ambientLight = new THREE.AmbientLight("white", 1.5);
	scene.add(ambientLight);


	const clock = new THREE.Clock();

	let numberTime = false;
	let diceNumber = 1;

	function setCameraPosition(zValue) {
		gsap.to(camera.position, {
			duration: 2,
			y: 1,
			z: zValue,
		});
	}

	function handleMouseWheel(event) {
		const currentZ = camera.position.z;
		const delta = event.deltaY;

		let newZ = currentZ + delta * 0.01;
	
		newZ = Math.min(3, Math.max(2, newZ));
		setCameraPosition(newZ);
	}

	window.addEventListener('wheel', handleMouseWheel);

	function draw() {
		const delta = clock.getDelta();
		if (player.mixer) player.mixer.update(delta);
		if (dice.mixer) dice.mixer.update(delta)

		renderer.render(scene, camera);
  		renderer.setAnimationLoop(draw);

		gsap.to(camera.position, {
			duration: 2,
			y: 1,
			z: 3,
		});
		  
		if(numberTime){
			gsap.to(dice.modelMesh.position, {
				duration: 0.3,
				x: -0.05,
				y: 2,
				z: 1,
				ease: 'easeInOut'
			});
			switch(diceNumber){
				case 1:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: 0.4,
						y: 0,
						z: 0,
						ease: 'easeInOut'
					});
					break;
				case 2:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: 2,
						y: 3.15,
						z: 0,
						ease: 'easeInOut'
					});
					break;
				case 3:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: 2,
						y: 3.15,
						z: 1.5,
						ease: 'easeInOut'
					});
					break;
				case 4:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: -1.1,
						y: 0,
						z: 1.5,
						ease: 'easeInOut'
					});
					break;
				case 5:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: -1.1,
						y: 0,
						z: 0,
						ease: 'easeInOut'
					});
					break;
				case 6:
					gsap.to(dice.modelMesh.rotation, {
						duration: 0.3,
						x: -2.7,
						y: 0,
						z: 0,
						ease: 'easeInOut'
					});
					break;
			}
		}
	}
	
	draw()

	const textBox = document.querySelector('.__intro')
	const content1 = "어서와 나는 개발자 mr.chu의 마리오라고 해."
	const content2 = "방문 해줘서 고마워. 나와 함께 개발자의 인생을 알아보자."
	const content3 = "시작하기에 앞서 너는 몇 년차 개발자의 인생을 보고싶어?"


	const up = document.querySelector('.arrow .up');
	const down = document.querySelector('.arrow .down');
	const jump = document.querySelector('.jump');
	const diceDisplay = document.querySelector('.dice-display');

	const ui = document.querySelector('.ui-btns')

	function updateDiceNumber() {
	  diceDisplay.textContent = diceNumber;
	}

	function rollDice() {
	  updateDiceNumber();
	  setTimeout(()=>{
		scene.remove(dice.modelMesh);
		dice.geometrt.dispose();
	  },1500)
	  ui.classList.remove('active')

	  const typed = new Typed('.__intro', {
		strings: [`${diceNumber}년 차 개발자의 인생이 궁금하구나?`, `자 ${diceNumber}년차 개발자의 인생으로 우리 어디 한번 떠나보자!`],
		typeSpeed: 50,
		startDelay: 1,
		onComplete: goGame
      });
	}

	function goGame(){
		textBox.classList.add("end")
		setTimeout(()=>{
			setHost();
		}, 1000)
	}

	function setHost(){
		if(location.hostname === 'chuhongkyu.github.io'){
			location.href = `/interact_3D/game.html?data=${diceNumber}`
		}else if(location.hostname === 'localhost'){
			location.href = `/game.html?data=${diceNumber}`
		}
	}

	function handleUpClick() {
	  if (diceNumber < 6) {
	    diceNumber++;
	  }
	  updateDiceNumber();
	}

	function handleDownClick() {
	  if (diceNumber > 1) {
	    diceNumber--;
	  }
	  updateDiceNumber();
	}

	up.addEventListener('click', handleUpClick);
	down.addEventListener('click', handleDownClick);
	jump.addEventListener('click', ()=>{
		player.actions[2].play();
		gsap.to(player.modelMesh.position, {
			delay:0.4,
			duration: 0.5,
			y: 0.7,
			onComplete: ()=>{
				dice.actions[1].play();
				gsap.to(player.modelMesh.position, {
				y: 0,duration: 0.4,onComplete:()=>{
					dice.actions[1].stop();
				}

			})}
		})
		setTimeout(()=>{
		  player.actions[2].stop();
		},1600)
		
		setTimeout(()=>{
		  player.actions[0].play();
		},1610)
		rollDice()
	});

	// Call updateDiceNumber to display the initial value
	updateDiceNumber();

	const time1 = setTimeout(()=> {
		textBox.style.display = "block";
		const typed = new Typed('.__intro', {
			strings: [content1, content2, content3],
			typeSpeed: 50,
			onComplete: changeNumber
		});
	}, 2000)

	function changeNumber(){
		ui.classList.add('active')
		return	numberTime = true;
	}

	

	// const axes = new THREE.AxesHelper(10);
	// scene.add(axes);

	// const gridHelper = new THREE.GridHelper(10, 10);
	// scene.add(gridHelper);

	window.addEventListener( 'resize', onWindowResize );
}


function onWindowResize() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	render();
}

function render() {
	renderer.render( scene, camera );
}