import * as THREE from 'three';
import gsap from 'gsap/gsap-core';
import { PlayerStop } from './modeljs/PlayerStop';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { World } from './modeljs/World';
import { Dice } from './modeljs/Dice';
import Typed from 'typed.js';
import { createScene, handleMouseWheel } from './intro/indexScene';
import { isLoading, loadingLottie } from './intro/loadingLottie';
import { goGame } from './intro/indexEndFunc';

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
	
	const { renderer, scene, camera } = createScene();

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

	
	const clock = new THREE.Clock();

	let selectDiceStage = false;
	let diceNumber = 1;

	loadingLottie();
	draw()
	startTextBox(startDiceStage);

	function draw() {
		const delta = clock.getDelta();
		if (player.mixer) player.mixer.update(delta);
		if (dice.mixer) dice.mixer.update(delta)

		renderer.render(scene, camera);
  		renderer.setAnimationLoop(draw);

		if(!isLoading()){
			gsap.to(camera.position, {
				duration: 2,
				y: 1,
				z: 3,
			});
		}
		
		if(selectDiceStage){
			handleDiceAnimation(dice, diceNumber)
		}
	}

	function updateDiceNumber() {
	  diceDisplay.textContent = diceNumber;
	}

	function rollDice() {
	  updateDiceNumber();
	  ui.classList.remove('active')

	  const typed = new Typed('.__intro', {
		strings: [`${diceNumber}년 차 개발자의 인생이 궁금하구나?`, `자 ${diceNumber}년차 개발자의 인생으로 우리 어디 한번 떠나보자!`],
		typeSpeed: 50,
		startDelay: 1,
		onComplete: ()=> goGame(textBox, diceNumber)
      });
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

	function startDiceStage(){
		ui.classList.add('active')
		return selectDiceStage = true
	}

	updateDiceNumber();
	
	window.addEventListener('wheel', (e) => handleMouseWheel(e, camera));
	up.addEventListener('click', handleUpClick);
	down.addEventListener('click', handleDownClick);
	
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

function startTextBox(func){
	setTimeout(()=> {
		textBox.style.display = "block";
		const typed = new Typed('.__intro', {
			strings: texts,
			typeSpeed: 50,
			onComplete: func
		});
	}, 4000)
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