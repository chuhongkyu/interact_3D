import * as THREE from 'three';

class GrassField {
  constructor({ count = 100, width = 10, height = 10, x = 0, y = 0, z = 0 } = {}) {
    this.count = count;
    this.width = width;
    this.height = height;

    this.geometry = this.createGeometry();
    this.material = this.createMaterial();

    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count);
    this.setPositions(x, y, z);
  }

  createGeometry() {
    const imageAspectRatio = 2.4 / 1.2;
    const planeWidth = 3;
    const planeHeight = planeWidth / imageAspectRatio;
  
    const grassGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const instancedGeometry = new THREE.InstancedBufferGeometry();
  
    instancedGeometry.attributes.position = grassGeometry.attributes.position;
    instancedGeometry.attributes.uv = grassGeometry.attributes.uv; 
    instancedGeometry.index = grassGeometry.index;
  
    return instancedGeometry;
  }

  createMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float time;
        attribute vec3 offset;
        varying vec2 vUv;
  
        void main() {
          vUv = uv; // 기본 UV 좌표 전달
          vec3 displacedPosition = position + offset;
          displacedPosition.x += sin(displacedPosition.z * 0.1 + time) * 0.05;
  
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D grassMaskTex;
        uniform sampler2D grassDiffTex;
        varying vec2 vUv;
  
        void main() {
          vec2 adjustedUv = vUv;
          adjustedUv.x *= 2.0; // 가로 비율 보정
          adjustedUv.y *= 1.0; // 세로 비율 유지
  
          vec4 maskColor = texture2D(grassMaskTex, adjustedUv);
          vec4 diffColor = texture2D(grassDiffTex, adjustedUv);
  
          float alpha = maskColor.r;
          vec4 grassColor = mix(vec4(0.2, 0.5, 0.2, 1.0), diffColor, alpha);
  
          gl_FragColor = vec4(grassColor.rgb, alpha);
        }
      `,
      uniforms: {
        grassMaskTex: { value: new THREE.TextureLoader().load('/assets/textures/grass.png') },
        grassDiffTex: { value: new THREE.TextureLoader().load('/assets/textures/grass_diffuse.jpg') },
        time: { value: 0.0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }
  

  setPositions(x, y, z) {
    const offsets = new Float32Array(this.count * 3);
    const rows = Math.sqrt(this.count);
    const cellWidth = this.width / rows;
    const cellHeight = this.height / rows;

    for (let i = 0; i < this.count; i++) {
      const row = Math.floor(i / rows);
      const col = i % rows;

      offsets[i * 3 + 0] = (col / rows) * this.width - this.width / 2 + Math.random() * cellWidth;
      offsets[i * 3 + 1] = 0;
      offsets[i * 3 + 2] = (row / rows) * this.height - this.height / 2 + Math.random() * cellHeight;
    }

    // 인스턴스의 상대적 위치를 설정한 후, 메쉬의 전체 위치를 조정
    this.geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
    this.mesh.position.set(x, y, z);  // 전체 메쉬 위치 설정
  }

  update(deltaTime) {
    this.material.uniforms.time.value += deltaTime;
  }

  addToScene(scene) {
    scene.add(this.mesh);
  }
}

export default GrassField;

