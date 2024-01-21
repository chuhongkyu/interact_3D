import * as THREE from 'three';
import gsap from 'gsap/gsap-core';
import { PlayerStop } from './modeljs/PlayerStop';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { World } from './modeljs/World';
import { Dice } from './modeljs/Dice';
import Typed from 'typed.js';
import "@lottiefiles/lottie-player";

let renderer, scene, camera, cubeCamera;
let loading = true;

// HTML
const textBox = document.querySelector('.__intro')
const up = document.querySelector('.arrow .up');
const down = document.querySelector('.arrow .down');
const jump = document.querySelector('.jump');
const diceDisplay = document.querySelector('.dice-display');
const ui = document.querySelector('.ui-btns')

const texts = [
	"어서와 나는 개발자 mr.chu의 마리오라고 해.",
	"방문 해줘서 고마워. 나와 함께 개발자의 인생을 알아보자.",
	"시작하기에 앞서 너는 몇 년차 개발자의 인생을 보고싶어?",
]

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

	const world = new World({
		gltfLoader, meshes, scene, modelSrc: "./models/world-intro.glb",
		x: 0, y: 0, z: 0,
		scale: { x: 0.2, y: 0.2, z: 0.2 }
	});

	const dice = new Dice({
		gltfLoader, scene, modelSrc: "./models/dice.glb",
		x: 3, y: 1, z: -1,
		scale: { x: 0.02, y: 0.02, z: 0.02 }
	});

	const urls = genCubeUrls( './images/sky/', '.png' );

	new THREE.CubeTextureLoader().load( urls, function ( cubeTexture ) {
		scene.background = cubeTexture;
		cubeCamera.update( renderer, scene );
		render();
	} );

	const ambientLight = new THREE.AmbientLight("white", 1.5);
	scene.add(ambientLight);

	const clock = new THREE.Clock();

	let numberTime = false;
	let diceNumber = 1;

	loadingLottie();
	draw()

	function draw() {
		const delta = clock.getDelta();
		if (player.mixer) player.mixer.update(delta);
		if (dice.mixer) dice.mixer.update(delta)

		renderer.render(scene, camera);
  		renderer.setAnimationLoop(draw);

		if(!loading){
			gsap.to(camera.position, {
				duration: 2,
				y: 1,
				z: 3,
			});
		}
		
		if(numberTime){
			handleDiceAnimation(dice, diceNumber)
		}
	}

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
			setHost(diceNumber);
		}, 1000)
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

	updateDiceNumber();

	setTimeout(()=> {
		textBox.style.display = "block";
		const typed = new Typed('.__intro', {
			strings: texts,
			typeSpeed: 50,
			onComplete: changeNumber
		});
	},4000)
	

	function changeNumber(){
		ui.classList.add('active')
		return	numberTime = true;
	}

	window.addEventListener('wheel', handleMouseWheel);
	up.addEventListener('click', handleUpClick);
	down.addEventListener('click', handleDownClick);
	window.addEventListener( 'resize', onWindowResize );
	jump.addEventListener('click', ()=>{
		player.actions[2].play();
		gsap.to(player.modelMesh.position, {
			delay:0.4,
			duration: 0.48,
			y: 0.7,
			onComplete: ()=>{
				gsap.to(dice.modelMesh.scale, {
					duration: 0.3,
					x: 0.03, y: 0.03, z: 0.03,
					ease: "spring",
					onComplete: ()=>{
						gsap.to(dice.modelMesh.scale, {
							duration: 0.3,
							x: 0.02, y: 0.02, z: 0.02,
							ease: "spring"
						})
					}
				})
				gsap.to(player.modelMesh.position, {
				y: 0, duration: 0.4, onComplete:()=>{
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
}

function handleMouseWheel(event) {
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

function onWindowResize() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	render();
}

function render() {
	renderer.render( scene, camera );
}

function loadingLottie(){
	let loadingDiv = document.querySelector('#three-js')
	const t1 = setTimeout(()=>{
		loadingDiv.classList.add('hide');
		return loading = false
	},2000)

	setTimeout(()=>{
		clearTimeout(t1)
	},3100)
}

function setHost(dice){
	if(location.hostname === 'chuhongkyu.github.io'){
		location.href = `/interact_3D/game.html?data=${dice}`
	}else if(location.hostname === 'localhost'){
		location.href = `/game.html?data=${dice}`
	}
}

function handleDiceAnimation(dice, number){
	gsap.to(dice.modelMesh.position, {
		duration: 0.3,
		x: -0.05,
		y: 2,
		z: 1,
		ease: 'easeInOut'
	});
	switch(number){
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