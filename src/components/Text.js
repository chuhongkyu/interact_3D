import * as THREE from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export function createText(scene, font, textList, position) {
  const textGroup = new THREE.Group();

  const totalTextWidth = textList.length; // 텍스트 전체 길이 (텍스트 수와 동일하게 설정)
  const textHeight = 0.3; // 텍스트 높이
  const spacing = 1.2; 

  let totalWidth = totalTextWidth * spacing; // 텍스트 전체 너비 계산
  let startX = -totalWidth / 2; // 시작 위치 계산


  for (let i = 0; i < textList.length; i++) {
    const textGeometry = new TextGeometry(textList[i], {
      font: font,
      size: textHeight,
      height: 0,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 텍스트의 머티리얼
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(startX + i * spacing, 0, 0); // 텍스트 위치 설정
    textGroup.position.set(position.x, position.y, position.z)
    textGroup.add(textMesh); // 텍스트 그룹에 추가
  }

  scene.add(textGroup);
}