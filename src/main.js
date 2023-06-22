import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Player } from "./Player";
import gsap from "gsap";
import { Hole } from "./Hole";
import { makeMotion, makeUI, makeWalking } from "./UI";
import { Coin } from "./Coin";
import { Box } from "./Box";
import { Enemy } from "./Enemy";
import { Rocket } from "./Rocket";
import { All } from "./All";

let LIFES = 2;

const lifes = document.querySelector('#container_ui_top .__lifes')
let ROCKET_FEILD = false;

function makeStage1($data){
  $data ? document.body.classList.add('type1') : document.body.classList.remove('type1')
  let modal = document.querySelector('.modal')
  modal.innerHTML = `
                      <p>개발을 하다보면 기확자, 디자이너등 다양한 직군들과 소통해야 하죠.<br>
                         그들의 요구는 떄로는 우리를 너무 괴롭힙니다.😂<br>
                         또한 그것을 해결하는 것은 온전히 개발자 혼자의 일 일것입니다.<br>
                         하지만 힘내세요.😃 개발자 여러분 혼자가 아닙니다.
                      </p>
                    `
  modal.classList.add('show')
  setTimeout(()=>{
    player.actions[2].play();
  },1500)

  setTimeout(()=>{
    player.actions[2].stop();
  },3200)

  setTimeout(()=>{
    document.body.classList.remove('type1')
    modal.classList.remove('show')
    updateLifes()
    gsap.to(camera.position, {
      duration: 1,
      y: 5,
    });
    gsap.to(enemyAll.modelMesh.position, {
      duration: 1,
      y: -3,
      ease: "easeOut",
    })
    scene.remove(rocketMesh);
    scene.remove(rocket.modelMesh);
    rocketMesh.geometry.dispose();
  },5000)
}

function updateLifes() {
  let life_number = lifes.querySelectorAll('span');
  life_number[0].classList.remove('active')
}

// Texture
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("./images/bg.png");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.x = 10;
floorTexture.repeat.y = 10;

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
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    map: floorTexture,
  })
);
floorMesh.name = "floor";
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);
meshes.push(floorMesh);

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

const treePMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    color: "blue",
    transparent: true,
    opacity: 0.5,
  })
);
treePMesh.position.set(-5, 0.005, 5);
treePMesh.rotation.x = -Math.PI / 2;
treePMesh.receiveShadow = true;
scene.add(treePMesh);

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
  x: 20,
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

const greenHole = new Hole({
  gltfLoader,
  scene,
  modelSrc: "./models/hole.glb",
  x: -9.5,
  y: -1.8,
  z: 8.5,
});

const mainHole = new Hole({
  gltfLoader,
  scene,
  modelSrc: "./models/hole.glb",
  x: -4.3,
  y: 0.5,
  z: 6.5,
});

const coin = new Coin({
  gltfLoader,
  scene,
  modelSrc: "./models/coin.glb",
  x: 0,
  y: 20,
  z: 5,
});

const coin2 = new Coin({
  gltfLoader,
  scene,
  modelSrc: "./models/coin.glb",
  x: 10,
  y: 20,
  z: 7,
});

const coin3 = new Coin({
  gltfLoader,
  scene,
  modelSrc: "./models/coin.glb",
  x: 14,
  y: 20,
  z: 3,
});

const player = new Player({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/mario.glb",
});

const enemy = new Enemy({
  scene,
  meshes,
  gltfLoader,
  modelSrc: "./models/turttle.glb",
  x: 0,
  y: 0.6,
  z: 5.4,
});

// makeWalking(()=>{
//   player.actions[3].play();
//   setTimeout(()=>{
//     player.actions[3].stop();
//   }, 1100)
// })

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

      // 그린 홀
      if (
        Math.abs(treePMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(treePMesh.position.z - player.modelMesh.position.z) < 1.5
      ){
        if (!greenHole.visible) {
          greenHole.visible = true;
          treePMesh.material.color.set("skyblue");
          gsap.to(greenHole.modelMesh.position, {
            //나타 날때
            duration: 1,
            y: 0,
            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          // 카메라 포지션 변경
          gsap.to(camera.position, {
            duration: 1,
            y: 3,
          });
        }
      } else if (greenHole.visible) {
        greenHole.visible = false;
        treePMesh.material.color.set("blue");
        gsap.to(greenHole.modelMesh.position, {
          //사라질 때
          duration: 1,
          y: -1.8,
        });
        // 카메라 포지션 변경
        gsap.to(camera.position, {
          duration: 1,
          y: 5,
        });
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
        } 
      }

      //로켓
      if(
        Math.abs(rocketMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(rocketMesh.position.z - player.modelMesh.position.z) < 1.5 && !ROCKET_FEILD
      ){
        ROCKET_FEILD = true;
        makeStage1(ROCKET_FEILD);
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
            duration: 2,
            x: -10,
            y: 0,
            z: -3,

            ease: "easeOut",
            // ease: "Bounce.easeOut",
          });
          // 카메라 포지션 변경
          gsap.to(camera.position, {
            duration: 1,
            y: 3,
          });
          
        }else if (rocket.visible) {
          rocket.visible = false;
          rocketMesh.material.color.set("black");
        }
      }

      //box
      if (
        Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 1.5 &&
        Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 1.5
      ) {
        if (!box.visible) {
          box.visible = true;
          spotMesh.material.color.set("seagreen");
          
          gsap.to(coin.modelMesh.position, {
            duration: 1,
            delay: 2,
            y: 1,
            ease: "Bounce.easeOut",
          });

          gsap.to(coin2.modelMesh.position, {
            duration: 1,
            delay: 2,
            y: 1,
            ease: "Bounce.easeOut",
          });

          gsap.to(coin3.modelMesh.position, {
            duration: 1,
            delay: 2,
            y: 1,
            ease: "Bounce.easeOut",
          });

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
        scene.remove(coin.modelMesh);
        scene.remove(coin2.modelMesh);
        scene.remove(coin3.modelMesh);
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
    // if(coin.modelMesh){
    //   gsap.to(coin.modelMesh.rotation, {
    //     duration: 1,
    //     y: 15,
    //     repeat: -1,
    //     ease: "Bounce.easeOut",
    //   });
    // }
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

