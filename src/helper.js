import * as THREE from "three";

export function makeHelper(scene){
    if(getParams("test")){
        
        const axes = new THREE.AxesHelper(10);
        scene.add(axes);
        //x,y,z 축 표

        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
        //바닥에 그리드 넣기
    }
    console.log(getParams("test"))
}


function getParams(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get(data);
  
    return testParam === 'true';
}