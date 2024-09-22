import * as THREE from "three";

export function makeHelper(scene){
    if(getParams("test")){
        
        const axes = new THREE.AxesHelper(10);
        scene.add(axes);

        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
    }
    console.log(getParams("test"))
}


export function getParams(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get(data);
  
    return testParam === 'true';
}