import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Player } from "./modeljs/Player";
import gsap from "gsap";
import { Basic } from "./modeljs/Basic";

import { KingBoo } from "./modeljs/KingBoo";
import { Luisi } from "./modeljs/Luisi";
import { Plant } from "./modeljs/Plant";
import { Castle } from "./modeljs/Castle";

import { OldWorld } from "./modeljs/Stage1";

import makeStage2 from "./components/MakeStage2";
import makeStage1 from "./components/MakeStage"
import makeEnd from "./components/MakeEndPoint";
import { makeInventory } from "./components/UI";
import { createText } from "./components/Text";
import { makeHelper } from "./utils/helper";
import GrassField from "./game/GrassField";
import { Ground } from "./game/Ground";
import { TurtleSpot } from "./game/TurtleSpot";
import { Stage2Spot } from "./game/Stage2Spot";
import { Stage1Spot } from "./game/Stage1Spot";

//목숨
const lifes = document.querySelector('#container_ui_top .__lifes')

// 1탄 Rocket필드
let ROCKET_FEILD = false;

// 2탄 Old 필드
let OLD_FEILD = false;


// END 필드
let END_FEILD = false;
let END_NOT = true;


// Plant 클릭
let isProcessingClick = false;
let inventory = document.getElementById('container_ui_right')

let isGameStart = false;

const mushroom = document.querySelector(".item .mushroom")
mushroom.addEventListener("dblclick", ()=>{
  mushroom.remove();
  updateLifes();
  player.addMushroom(gltfLoader, './assets/models/mushroom.glb');
})

// 라이프 업데이트
function updateLifes() {
  let LIFES = lifes.querySelectorAll('span.active');
  LIFES[0].classList.remove('active')
  gsap.fromTo(LIFES[0],{scale: 1.2},{scale: 1})
  if(lifes.querySelectorAll('span.active').length == 0){
    return  END_FEILD = true;
  }
}

// info 클릭
const info = document.querySelector('#container_ui_bottom .__info')
info.addEventListener('click',()=>{
  info.querySelector('.__info-container').classList.toggle('active')
})

const modal = document.querySelector(".modal");

function loadingLottie() {
  let loadingDiv = document.querySelector('.loading')
  const t1 = setTimeout(() => {
    loadingDiv.classList.add('hide');
    isGameStart = true;
    setTimeout(function() {
      modal.classList.remove("show");
    }, 4000);
  }, 2000);
}

loadingLottie()


// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );

// FontLoader를 사용하여 폰트 로드
const fontLoader = new FontLoader();
const fontUrl = "./assets/fonts/Pretendard.json"


// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// Camera
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), // left
  window.innerWidth / window.innerHeight, // right,
  1, // top
  -1, // bottom
  -1000,
  1000
);

const cameraPosition = new THREE.Vector3(1, 5, 5);
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
camera.zoom = 0.3;
camera.updateProjectionMatrix();
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
const directionalLightOriginPosition = new THREE.Vector3(1, 2, 2);
directionalLight.position.x = directionalLightOriginPosition.x;
directionalLight.position.y = directionalLightOriginPosition.y;
directionalLight.position.z = directionalLightOriginPosition.z;
directionalLight.castShadow = true;

// mapSize 세팅으로 그림자 퀄리티 설정
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// 그림자 범위
directionalLight.shadow.camera.left = -30;
directionalLight.shadow.camera.right = 30;
directionalLight.shadow.camera.top = 30;
directionalLight.shadow.camera.bottom = -30;
directionalLight.shadow.camera.near = -60;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

// Mesh
const meshes = [];

const gltfLoader = new GLTFLoader();

//player
const player = new Player({
  scene, meshes, gltfLoader,modelSrc: "./assets/models/mario_really.glb",
});

//this is mouse
const pointerMesh = new THREE.Mesh(
  new THREE.CircleGeometry(0.5, 32),
  new THREE.MeshBasicMaterial({
    color: "#d91c1c",
    transparent: true,
    opacity: 0.5,
  })
);
pointerMesh.rotation.x = -Math.PI / 2;
pointerMesh.position.y = 0.02;
pointerMesh.receiveShadow = true;
scene.add(pointerMesh);

//메인 홀
const mainHole = new Basic({
  gltfLoader, scene, modelSrc: "./assets/models/hole.glb",
  x: -4.3, y: 0.5, z: 6.2,
  scale: { x: 0.6, y: 0.6, z: 0.6 }
});

//box
const box = new Basic({
	gltfLoader, scene, modelSrc: "./assets/models/box.glb",
	x: 5, y: -1.3, z: 2,
	scale: { x: 0.6, y: 0.6, z: 0.6 }
});

//box spot
const spotMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    color: "yellow",
    transparent: true,
    opacity: 0.5,
  })
);
spotMesh.position.set(5, 0.005, 5);
spotMesh.rotation.x = -Math.PI / 2;
spotMesh.receiveShadow = true;
scene.add(spotMesh);

const luisi = new Luisi({
  scene, meshes, gltfLoader,
  modelSrc: "./assets/models/luisi.glb",
});

// luisi
fontLoader.load(fontUrl, function (font) {
  createText(scene, font, ['루이지'], {x: 5.5, y: 1.2, z:10})
});

const rocket = new Basic({
  gltfLoader, scene, modelSrc: "./assets/models/rocket.glb",
  x: 22, y: 0, z: -3,
  scale: { x: 0.5, y: 0.5, z: 0.5 }
});

const castle = new Castle({
  gltfLoader, scene,
  modelSrc: "./assets/models/castle.glb",
  x: 0, y: 4, z: -26.5,
});

const castleMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(8.5, 8.5),
  new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.4,
    color: "black",
  })
);
castleMesh.position.set(-0.3, 0.005, -25);
castleMesh.rotation.x = -Math.PI / 2;
castleMesh.receiveShadow = true;
scene.add(castleMesh);

const plant = new Plant({
  scene, meshes, gltfLoader, modelSrc: "./assets/models/plant.glb",
  x: 15, y: 0, z: 0,
})

const plant1 = new Plant({
  scene, meshes, gltfLoader,modelSrc: "./assets/models/plant.glb",
  x: -15,y: 0,z: 4,
})

// luisi
fontLoader.load(fontUrl, function (font) {
  createText(scene, font, ['아이템'], {x: 15.1, y: 0.2, z: 1.5})
});

const boo = new Basic({
  scene,meshes,gltfLoader,modelSrc: "./assets/models/ghost.glb",
  x: -9,y: -1.3,z: -3,
  scale: { x: 0.6, y: 0.6, z: 0.6 },
  rotation: {x: 0, y: 2, z: 0 }
});

const boo1 = new Basic({
  scene,meshes,gltfLoader,modelSrc: "./assets/models/ghost.glb",
  x: -3,y: -1.3,z: -5,
  scale: { x: 0.6, y: 0.6, z: 0.6 },
  rotation: {x: 0, y: 2, z: 0 }
});

const boo2 = new Basic({
  scene,meshes,gltfLoader,modelSrc: "./assets/models/ghost.glb",
  x: -1, y: -1.3, z: -5,
  rotation: {x: 0, y: 2, z: 0 }
});

const kingBoo = new KingBoo({
  gltfLoader, scene, meshes, modelSrc: "./assets/models/king-boo.glb",
});

const kingBooMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(4, 4),
  new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.1,
  })
);
kingBooMesh.position.set(-5, 0.005, -5);
kingBooMesh.rotation.x = -Math.PI / 2;
kingBooMesh.receiveShadow = true;
scene.add(kingBooMesh);

fontLoader.load(fontUrl, function (font) {
  createText(scene, font, ['킹 부우'], {x: -5, y: 1.2, z:-2})
});


Ground(scene, meshes);
const { turtle, turtlePosition } = TurtleSpot(gltfLoader, fontLoader, fontUrl, scene, meshes);
const { stage2model, stage2Position } = Stage2Spot(gltfLoader, fontLoader, fontUrl, scene, meshes);
const { stage1model, stage1Position, grassField } = Stage1Spot(gltfLoader, fontLoader, fontUrl, scene, meshes);

const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let destinationPoint = new THREE.Vector3();
let angle = 0;
let isPressed = false;

const clock = new THREE.Clock();

// 그리기
function draw() {
  const delta = clock.getDelta();
  if(grassField){
    grassField.update(delta);
  }
  if (player.mixer) player.mixer.update(delta);
  if (luisi.mixer) luisi.mixer.update(delta);
  if (kingBoo.mixer) kingBoo.mixer.update(delta);
  if (plant.mixer) plant.mixer.update(delta);
  if (plant1.mixer) plant1.mixer.update(delta);

  if (player.modelMesh) camera.lookAt(player.modelMesh.position);
  if (player.modelMesh) {
    if (isPressed) raycasting();

    if (player.moving) {
      // 걸어가는 상태
      angle = Math.atan2(
        destinationPoint.z - player.modelMesh.position.z,
        destinationPoint.x - player.modelMesh.position.x,
      );
      player.modelMesh.position.x += Math.cos(angle) * 0.05;
      player.modelMesh.position.z += Math.sin(angle) * 0.05;

      camera.position.x = cameraPosition.x + player.modelMesh.position.x;
      camera.position.z = cameraPosition.z + player.modelMesh.position.z;

      player.actions[0].stop();
      player.actions[1].play();

      //Player 무브
      if (
        Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
        Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
      ) { player.moving = false; }

      // endPoint
      if (
        Math.abs(castleMesh.position.x - player.modelMesh.position.x) < 4 &&
        Math.abs(castleMesh.position.z - player.modelMesh.position.z) < 4
      ){
          makeEnd(END_NOT, END_FEILD, 
          ()=> END_NOT = false,
          ()=> {
            gsap.to(castle.modelMesh.position, {
              duration: 1,
              y: -3,
              ease: "easeOut",
              onComplete: ()=> {
                scene.remove(castle);
                scene.remove(castleMesh)
              }
            })
            gsap.to(camera.position, {
              duration: 1,
              y: 3,
            });
          })
        }

      // stage1
      if (
        Math.abs(stage1Position.position.x - player.modelMesh.position.x) < 3 &&
        Math.abs(stage1Position.position.z - player.modelMesh.position.z) < 3 && !OLD_FEILD
      ){
        OLD_FEILD = true;
        makeStage1(OLD_FEILD,player,()=>{
            stage1model.visible = false;
            stage1Position.material.color.set("blue");
            gsap.to(stage1model.modelMesh.position, {
              duration: 1,
              y: -4,
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 5,
            });
            updateLifes()
            scene.remove(stage1Position);
            stage1Position.geometry.dispose();
        })
        if (!stage1model.visible) {
            stage1model.visible = true
            stage1Position.material.color.set("blue");
            gsap.to(stage1model.modelMesh.position, {
              duration: 1,
              y: 0,
              ease: "easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 3,
            });
        }
      }
      //터틀백
      if (
        Math.abs(turtlePosition.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(turtlePosition.position.z - player.modelMesh.position.z) < 1.5
      ){
        if (!turtle.visible) {
          turtle.visible = true;
          gsap.to(turtle.modelMesh.position, {
            //나타 날때
            duration: 2,
            z: 15,
            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          gsap.to(turtle.modelMesh.rotation, {
            //나타 날때
            duration: 2,
            y: 15,
            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          setTimeout(()=>{
            if(turtle){
              scene.remove(turtle.modelMesh);
              turtlePosition.geometry.dispose();
            }
          },1500)
        } 
      }

      //stage2
      if(
        Math.abs(stage2Position.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(stage2Position.position.z - player.modelMesh.position.z) < 1.5 && !ROCKET_FEILD
      ){
        ROCKET_FEILD = true;
        makeStage2(ROCKET_FEILD,player,()=>{
          updateLifes()
          stage2model.visible = false;
          gsap.to(rocket.modelMesh.position, {
            duration: 1,
            y: -3,
            ease: "easeOut",
          })
          gsap.to(stage2model.modelMesh.position, {
            duration: 1,
            y: -3,
          });
          scene.remove(stage2Position);
          scene.remove(rocket.modelMesh);
          stage2Position.geometry.dispose();
        })
        if(!stage2model.visible){
          stage2model.visible = true;
          gsap.to(stage2model.modelMesh.position, {
            duration: 2,
            y: 0,
            ease: "easeOut",
          })
        }
        if (!rocket.visible) {
          rocket.visible = true;
          gsap.to(rocket.modelMesh.position, {
            //나타 날때
            delay: 1.5,
            duration: 2,
            x: -10,
            y: 0,
            z: -3,

            ease: "easeOut",
          });
          
        }else if (rocket.visible) {
          rocket.visible = false;
          stage2Position.material.color.set("black");
        }
      }

      // kingBoo
      if (
        Math.abs(kingBooMesh.position.x - player.modelMesh.position.x) < 2 &&
        Math.abs(kingBooMesh.position.z - player.modelMesh.position.z) < 2
      ) {
        if(!boo.visible){
          boo.visible = true;
          gsap.to(boo.modelMesh.position, {
            duration: 1,
            y: 3,
            ease: "easeOut",
          });
          gsap.to(boo1.modelMesh.position, {
            duration: 1,
            y: 1.3,
            ease: "easeOut",
          });
          gsap.to(boo2.modelMesh.position, {
            duration: 1,
            y: 3,
            ease: "easeOut",
          });
        }
      } else if(boo.visible){
        gsap.to(boo.modelMesh.position, {
          y: -1.3,
        });
        gsap.to(boo1.modelMesh.position, {
          y: -1.3,
        });
        gsap.to(boo2.modelMesh.position, {
          y: -1.3,
        });
        boo.visible = false;
      }

      //box
      if (
        Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 1.5
      ) {
        if(!luisi.visible){
          luisi.visible = true;
          if(luisi.modelMesh){
            luisi.actions[2].play()
            
            setTimeout(()=>{
              luisi.actions[2].stop()
              luisi.actions[0].play()
            },1500)
            
          }else{
            
          }
        }
        if (!box.visible) {
          box.visible = true;
          spotMesh.material.color.set("seagreen");

          gsap.to(box.modelMesh.position, {
            duration: 1,
            y: 1,
            ease: "Bounce.easeOut",
          });
        }
      } else if (box.visible) {
        box.visible = false;
        spotMesh.material.color.set("yellow");
        gsap.to(box.modelMesh.position, {
          duration: 0.5,
          y: -1.3,
        });
      }
    } else {
      // 서 있는 상태
      player.actions[1].stop();
      player.actions[0].play();
    }


    if(mainHole.modelMesh && isGameStart){
      gsap.to(mainHole.modelMesh.position, {
        duration: 1,
        y: -5.5,
        ease: "Bounce.easeOut",
      });
      gsap.to(camera, {
        duration: 0.3,
        zoom: 0.2,
        ease: "Sine.easeInOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }
  }

  renderer.render(scene, camera);
  renderer.setAnimationLoop(draw);
}

function checkIntersects() {
  // raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(meshes);
  for (const item of intersects) {
    if (item.object.name === "floor") {
      destinationPoint.x = item.point.x;
      destinationPoint.y = 0.3;
      destinationPoint.z = item.point.z;
      player.modelMesh.lookAt(destinationPoint);
      player.moving = true;

      pointerMesh.position.x = destinationPoint.x;
      pointerMesh.position.z = destinationPoint.z;
    }
    break;
  }


  const intersects2 = raycaster.intersectObject(plant.modelMesh);
  if (intersects2.length > 0) {
    if (!isProcessingClick) {
      isProcessingClick = true;
      inventory.classList.add('active')
      // plant 메시가 클릭되었을 때의 동작을 수행합니다.
      console.log("Plant 메시가 클릭되었습니다!");

      setTimeout(() => {
        isProcessingClick = false;
      }, 1000);
    }
  }

}

function setSize() {
  camera.left = -(window.innerWidth / window.innerHeight);
  camera.right = window.innerWidth / window.innerHeight;
  camera.top = 1;
  camera.bottom = -1;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);

// 마우스 좌표를 three.js에 맞게 변환
function calculateMousePosition(e) {
  mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
  mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
}

// 변환된 마우스 좌표를 이용해 래이캐스팅
function raycasting() {
  raycaster.setFromCamera(mouse, camera);
  checkIntersects();
}

// 마우스 이벤트
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  calculateMousePosition(e);
});
canvas.addEventListener("mouseup", () => {
  isPressed = false;
});
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    calculateMousePosition(e);
  }
});

// 터치 이벤트
canvas.addEventListener("touchstart", (e) => {
  isPressed = true;
  calculateMousePosition(e.touches[0]);
});
canvas.addEventListener("touchend", () => {
  isPressed = false;
});
canvas.addEventListener("touchmove", (e) => {
  if (isPressed) {
    calculateMousePosition(e.touches[0]);
  }
});

draw();
makeInventory();
makeHelper(scene);
