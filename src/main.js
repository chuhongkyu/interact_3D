import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Player } from "./Player";
import gsap from "gsap";
import { Hole } from "./Hole";
import { Box } from "./Box";
import { Enemy } from "./Enemy";
import { Rocket } from "./Rocket";
import { All } from "./All";
import makeStage1 from "./MakeStage"
import { KingBoo } from "./KingBoo";
import { OldWorld } from "./OldWorld";
import makeStage2 from "./MakeStage2";
import { Luisi } from "./Luisi";
import { Boo } from "./Boo";
import { Plant } from "./Plant";
import { Castle } from "./Castle";
import makeEnd from "./MakeEndPoint";

//목숨
const lifes = document.querySelector('#container_ui_top .__lifes')

// 1탄 Rocket필드
let ROCKET_FEILD = false;

// 2탄 Old 필드
let OLD_FEILD = false;


// END 필드
let END_FEILD = false;
let END_NOT = true;

// 라이프 업데이트
function updateLifes() {
  let LIFES = lifes.querySelectorAll('span.active');
  LIFES[0].classList.remove('active')
}

// info 클릭
const info = document.querySelector('#container_ui_bottom .__info')
info.addEventListener('click',()=>{
  info.querySelector('.__info-container').classList.toggle('active')
})

// Texture
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("./images/bg.png");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.x = 6;
floorTexture.repeat.y = 6;

// FontLoader를 사용하여 폰트 로드
const fontLoader = new FontLoader();
const fontUrl = "/fonts/Pretendard.json"
fontLoader.load(fontUrl, function (font) {
  const textGroup = new THREE.Group(); // 텍스트 그룹 생성
  const textList = ['킹 부우'];

  const totalTextWidth = textList.length; // 텍스트 전체 길이 (텍스트 수와 동일하게 설정)
  const textHeight = 0.3; // 텍스트 높이
  const spacing = 1.2; // 텍스트 간격

  let totalWidth = totalTextWidth * spacing; // 텍스트 전체 너비 계산
  let startX = -totalWidth / 2; // 시작 위치 계산

  for (let i = 0; i < textList.length; i++) {
    const textGeometry = new TextGeometry(textList[i], {
      font: font, // 사용할 폰트
      size: textHeight, // 텍스트 크기
      height: 0, // 텍스트의 두께
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 텍스트의 머티리얼
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(startX + i * spacing, 0, 0); // 텍스트 위치 설정
    textGroup.position.set(-5,1.2,-2)
    textGroup.add(textMesh); // 텍스트 그룹에 추가
  }

  scene.add(textGroup); // 텍스트 그룹을 scene에 추가
});


// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();

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
camera.zoom = 0.2;
camera.updateProjectionMatrix();
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 0.5);
const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
directionalLight.position.x = directionalLightOriginPosition.x;
directionalLight.position.y = directionalLightOriginPosition.y;
directionalLight.position.z = directionalLightOriginPosition.z;
directionalLight.castShadow = true;

// mapSize 세팅으로 그림자 퀄리티 설정
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
// 그림자 범위
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = -100;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

// Mesh
const meshes = [];
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({
    map: floorTexture,
  })
);
floorMesh.name = "floor";
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);
meshes.push(floorMesh);


//this is mouse
const pointerMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.7, 0.7),
  new THREE.MeshBasicMaterial({
    color: "black",
    transparent: true,
    opacity: 0.2,
  })
);
pointerMesh.rotation.x = -Math.PI / 2;
pointerMesh.position.y = 0.01;
pointerMesh.receiveShadow = true;
scene.add(pointerMesh);

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

fontLoader.load(fontUrl, function (font) {
  const textGroup = new THREE.Group(); // 텍스트 그룹 생성
  const textList = ['루이지'];

  const totalTextWidth = textList.length; // 텍스트 전체 길이 (텍스트 수와 동일하게 설정)
  const textHeight = 0.3; // 텍스트 높이
  const spacing = 1.2; // 텍스트 간격

  let totalWidth = totalTextWidth * spacing; // 텍스트 전체 너비 계산
  let startX = -totalWidth / 2; // 시작 위치 계산

  for (let i = 0; i < textList.length; i++) {
    const textGeometry = new TextGeometry(textList[i], {
      font: font, // 사용할 폰트
      size: textHeight, // 텍스트 크기
      height: 0, // 텍스트의 두께
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 텍스트의 머티리얼
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(startX + i * spacing, 0, 0); // 텍스트 위치 설정
    textGroup.position.set(5.5,1.2,10)
    textGroup.add(textMesh); // 텍스트 그룹에 추가
  }
  scene.add(textGroup); // 텍스트 그룹을 scene에 추가
});

//stage2
const stageTwoMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(6, 6),
  new THREE.MeshStandardMaterial({
    color: "blue",
    transparent: true,
    opacity: 0.2,
  })
);
stageTwoMesh.position.set(-6, 0.005, 6);
stageTwoMesh.rotation.x = -Math.PI / 2;
stageTwoMesh.receiveShadow = true;
scene.add(stageTwoMesh);


//turttle
const enemyMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.1,
  })
);
enemyMesh.position.set(0, 0.005, 5);
enemyMesh.rotation.x = -Math.PI / 2;
enemyMesh.receiveShadow = true;
scene.add(enemyMesh);

fontLoader.load(fontUrl, function (font) {
  const textGroup = new THREE.Group(); // 텍스트 그룹 생성
  const textList = ['거북이?'];

  const totalTextWidth = textList.length; // 텍스트 전체 길이 (텍스트 수와 동일하게 설정)
  const textHeight = 0.3; // 텍스트 높이
  const spacing = 1.2; // 텍스트 간격

  let totalWidth = totalTextWidth * spacing; // 텍스트 전체 너비 계산
  let startX = -totalWidth / 2; // 시작 위치 계산

  for (let i = 0; i < textList.length; i++) {
    const textGeometry = new TextGeometry(textList[i], {
      font: font, // 사용할 폰트
      size: textHeight, // 텍스트 크기
      height: 0, // 텍스트의 두께
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 텍스트의 머티리얼
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(startX + i * spacing, 0, 0); // 텍스트 위치 설정
    textGroup.position.set(0.4,1.2,8)
    textGroup.add(textMesh); // 텍스트 그룹에 추가
  }

  scene.add(textGroup); // 텍스트 그룹을 scene에 추가
});

const gltfLoader = new GLTFLoader();

const box = new Box({
  gltfLoader,
  scene,
  modelSrc: "./models/box.glb",
  x: 5,
  y: -1.3,
  z: 2,
});

const rocket = new Rocket({
  gltfLoader,
  scene,
  modelSrc: "./models/rocket.glb",
  x: 22,
  y: 0,
  z: -3,
});

const enemyAll = new All({
  gltfLoader,
  scene,
  modelSrc: "./models/All.glb",
  x: 10,
  y: -3,
  z: -6,
});

const rocketMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    color: "blue",
    transparent: true,
    opacity: 0.3,
  })
);
rocketMesh.position.set(10, 0.005, -4);
rocketMesh.rotation.x = -Math.PI / 2;
rocketMesh.receiveShadow = true;
scene.add(rocketMesh);

const mainHole = new Hole({
  gltfLoader,
  scene,
  modelSrc: "./models/hole.glb",
  x: -4.3,
  y: 0.5,
  z: 6.5,
});

const worldHole = new OldWorld({
  gltfLoader,
  scene,
  modelSrc: "./models/world.glb",
  x: -5,
  y: -4,
  z: 4,
});

const castle = new Castle({
  gltfLoader,
  scene,
  modelSrc: "./models/castle.glb",
  x: 0,
  y: 4,
  z: -21,
});

castle.visible = true

const castleMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(8.5, 8.5),
  new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.4,
    color: "black",
  })
);
castleMesh.position.set(-0.3, 0.005, -20);
castleMesh.rotation.x = -Math.PI / 2;
castleMesh.receiveShadow = true;
scene.add(castleMesh);

const greenHole = new Hole({
  gltfLoader,
  scene,
  modelSrc: "./models/hole.glb",
  x: -15,
  y: -1.8,
  z: 12,
});

const player = new Player({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/mario.glb",
});

const luisi = new Luisi({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/luisi.glb",
});

const plant = new Plant({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/plant.glb",
  x: 15,
  y: 0,
  z: 0,
})

const plant1 = new Plant({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/plant.glb",
  x: -15,
  y: 0,
  z: 4,
})

const boo = new Boo({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/ghost.glb",
  x: -9,
  y: -1.3,
  z: -3,
});

const boo1 = new Boo({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/ghost.glb",
  x: -3,
  y: -1.3,
  z: -5,
});

const boo2 = new Boo({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/ghost.glb",
  x: -1,
  y: -1.3,
  z: -5,
});

const kingBoo = new KingBoo({
  gltfLoader,
  scene,
  meshes,
  modelSrc: "./models/king-boo.glb",
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

const enemy = new Enemy({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/turttle.glb",
  x: 0,
  y: 0.6,
  z: 5.4,
});

const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let destinationPoint = new THREE.Vector3();
let angle = 0;
let isPressed = false; // 마우스를 누르고 있는 상태

const clock = new THREE.Clock();
// 그리기
function draw() {
  const delta = clock.getDelta();
  
  if (player.mixer) player.mixer.update(delta);
  if (luisi.mixer) luisi.mixer.update(delta);
  if (kingBoo.mixer) kingBoo.mixer.update(delta);
  if (plant.mixer) plant.mixer.update(delta)
  if (plant1.mixer) plant1.mixer.update(delta)
  
  if (player.modelMesh) {
    camera.lookAt(player.modelMesh.position);
  }

  if (player.modelMesh) {
    if (isPressed) {
      raycasting();
    }

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

      if (
        Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
        Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
      ) {
        player.moving = false;
      }

      // endPoint
      if (
        Math.abs(castleMesh.position.x - player.modelMesh.position.x) < 4 &&
        Math.abs(castleMesh.position.z - player.modelMesh.position.z) < 4
      ){
        makeEnd(END_NOT, END_FEILD, ()=>{
          END_NOT = false;
        })
      }

      // stage2
      if (
        Math.abs(stageTwoMesh.position.x - player.modelMesh.position.x) < 3 &&
        Math.abs(stageTwoMesh.position.z - player.modelMesh.position.z) < 3 && !OLD_FEILD
      ){
        OLD_FEILD = true;
        makeStage2(OLD_FEILD,player,()=>{
          greenHole.visible = false;
          worldHole.visible = false;
          stageTwoMesh.material.color.set("blue");
          gsap.to(greenHole.modelMesh.position, {
            duration: 1,
            y: -1.8,
          });
          gsap.to(worldHole.modelMesh.position, {
            duration: 1,
            y: -4,
          });
          // 카메라 포지션 변경
          gsap.to(camera.position, {
            duration: 1,
            y: 5,
          });
          updateLifes()
          scene.remove(stageTwoMesh);
          stageTwoMesh.geometry.dispose();
        })
        if (!greenHole.visible && !worldHole.visible) {
          worldHole.visible = true
          greenHole.visible = true;
          stageTwoMesh.material.color.set("blue");
          gsap.to(greenHole.modelMesh.position, {
            duration: 1,
            y: 0,
            ease: "easeOut",
          });
          gsap.to(worldHole.modelMesh.position, {
            duration: 1,
            y: 0,
            ease: "easeOut",
          });
          // 카메라 포지션 변경
          gsap.to(camera.position, {
            duration: 1,
            y: 3,
          });
        }
      } else if (greenHole.visible || worldHole.visible) {
        
      }
      //터틀백
      if (
        Math.abs(enemyMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(enemyMesh.position.z - player.modelMesh.position.z) < 1.5
      ){
        if (!enemy.visible) {
          enemy.visible = true;
          gsap.to(enemy.modelMesh.position, {
            //나타 날때
            duration: 2,
            z: 15,
            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          gsap.to(enemy.modelMesh.rotation, {
            //나타 날때
            duration: 2,
            y: 15,
            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          setTimeout(()=>{
            if(enemy){
              scene.remove(enemy.modelMesh);
              enemyMesh.geometry.dispose();
            }
          },1500)
        } 
      }

      //로켓
      if(
        Math.abs(rocketMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(rocketMesh.position.z - player.modelMesh.position.z) < 1.5 && !ROCKET_FEILD
      ){
        ROCKET_FEILD = true;
        makeStage1(ROCKET_FEILD,player,()=>{
          updateLifes()
          // gsap.to(camera.position, {
          //   duration: 1,
          //   y: 5,
          // });
          gsap.to(enemyAll.modelMesh.position, {
            duration: 1,
            y: -3,
            ease: "easeOut",
          })
          scene.remove(rocketMesh);
          scene.remove(rocket.modelMesh);
          rocketMesh.geometry.dispose();
        })
        if(!enemyAll.visible){
          gsap.to(enemyAll.modelMesh.position, {
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
            // ease: "Bounce.easeOut",
          });
          
        }else if (rocket.visible) {
          rocket.visible = false;
          rocketMesh.material.color.set("black");
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
        box.visible = false;
      }

      //box
      if (
        Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 1.5
      ) {
        if(!luisi.visible){
          luisi.visible = true;
          if(luisi.modelMesh){
            gsap.to(luisi.modelMesh.rotation, {
              duration: 2,
              y: 3,
              ease: "easeOut",
              delay: 0.5,
            });
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

          gsap.to(camera.position, {
            duration: 1,
            y: 3,
          });
        }
      } else if (box.visible) {
        box.visible = false;
        spotMesh.material.color.set("yellow");
        gsap.to(box.modelMesh.position, {
          duration: 0.5,
          y: -1.3,
        });
        gsap.to(camera.position, {
          duration: 1,
          y: 5,
        });
      }
    } else {
      // 서 있는 상태
      player.actions[1].stop();
      player.actions[0].play();
    }


    if(mainHole.modelMesh){
      gsap.to(mainHole.modelMesh.position, {
        duration: 1,
        y: -5.5,
        ease: "Bounce.easeOut",
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

      // console.log(item.point)

      player.moving = true;

      pointerMesh.position.x = destinationPoint.x;
      pointerMesh.position.z = destinationPoint.z;
    }
    break;
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

