import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function createPlasmaMaterial(letterIndex: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uLetterIndex: { value: letterIndex }
    },
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float uTime;
      void main() {
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;
      uniform float uTime;
      uniform float uIntensity;
      uniform float uLetterIndex;

      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float worley(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float minDist = 1.0;
        for(int y = -1; y <= 1; y++) {
          for(int x = -1; x <= 1; x++) {
            vec2 nb = vec2(float(x), float(y));
            vec2 pt = hash2(i + nb);
            pt = 0.5 + 0.5 * sin(uTime * 0.8 + 6.2831 * pt);
            float dist = length(nb + pt - f);
            minDist = min(minDist, dist);
          }
        }
        return minDist;
      }

      void main() {
        vec2 uv = vPosition.xy * 2.5 + vec2(uTime * 0.15, uLetterIndex * 0.7);
        float p1 = worley(uv + uTime * 0.2);
        float p2 = worley(uv * 1.8 - uTime * 0.12);
        float field = p1 * p2;

        vec3 viewDir = normalize(cameraPosition - vPosition);
        float rim = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);

        vec3 violet = vec3(0.35, 0.0, 0.8);
        vec3 cyan   = vec3(0.0, 0.8, 1.0);
        vec3 white  = vec3(1.0, 1.0, 1.0);

        vec3 plasma = mix(violet, cyan, field);
        plasma = mix(plasma, white, rim * 0.7);
        plasma += rim * vec3(0.2, 0.6, 1.0) * uIntensity * 0.6;

        vec3 clean = vec3(1.0);
        vec3 final = mix(clean, plasma, uIntensity);
        float alpha = mix(0.95, 0.85 + field * 0.15, uIntensity);
        gl_FragColor = vec4(final, alpha);
      }
    `
  });
}

export function initVoltageScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6);

  const updateSize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    renderer.setSize(parent.clientWidth, parent.clientHeight, false);
    camera.aspect = parent.clientWidth / parent.clientHeight;
    camera.updateProjectionMatrix();
    composer.setSize(parent.clientWidth, parent.clientHeight);
  };

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
    0.85,  // strength
    0.4,   // radius
    0.15   // threshold
  ));

  const arcGroup = new THREE.Group();
  scene.add(arcGroup);

  const letters = ['S','A','V','A','N','T'];
  const meshes: THREE.Mesh[] = [];
  const initialPositions: THREE.Vector3[] = [];
  let arcSpawnEnabled = true;

  const timeouts: ReturnType<typeof setTimeout>[] = [];
  const intervals: ReturnType<typeof setInterval>[] = [];

  function spawnArc(fromMesh: THREE.Mesh, toMesh: THREE.Mesh) {
    const start = fromMesh.position.clone().add(new THREE.Vector3(0.8, 0, 0));
    const end = toMesh.position.clone().add(new THREE.Vector3(0, 0, 0));
    const segments = 18;
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const base = start.clone().lerp(end, t);
      if (i > 0 && i < segments) {
        const jagg = 0.18 * (1 - Math.abs(t - 0.5) * 2);
        base.y += (Math.random() - 0.5) * 2 * jagg;
        base.z += (Math.random() - 0.5) * jagg * 0.5;
      }
      points.push(base);
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, segments, 0.006, 4, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00cfff'),
      transparent: true,
      opacity: 0.9
    });
    const arc = new THREE.Mesh(tubeGeo, tubeMat);
    arcGroup.add(arc);

    let life = 0;
    const flicker = setInterval(() => {
      life++;
      tubeMat.opacity = Math.random() > 0.5 ? 0.9 : 0.3;
      if (life > 5) {
        clearInterval(flicker);
        const fadeOut = setInterval(() => {
          tubeMat.opacity -= 0.15;
          if (tubeMat.opacity <= 0) {
            clearInterval(fadeOut);
            arcGroup.remove(arc);
            tubeGeo.dispose();
            tubeMat.dispose();
          }
        }, 16);
        intervals.push(fadeOut);
      }
    }, 60);
    intervals.push(flicker);
  }

  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (loadedFont) => {
    let xOffset = -3.2;

    letters.forEach((char, i) => {
      const geo = new TextGeometry(char, {
        font: loadedFont,
        size: 1.1,
        depth: 0.3,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.015,
        bevelSegments: 4
      });
      geo.computeBoundingBox();
      const charWidth = geo.boundingBox!.max.x - geo.boundingBox!.min.x;
      const mesh = new THREE.Mesh(geo, createPlasmaMaterial(i));
      mesh.position.x = xOffset;
      mesh.position.y = -0.5;
      initialPositions.push(mesh.position.clone());
      xOffset += charWidth + 0.12;
      scene.add(mesh);
      meshes.push(mesh);
    });

    const pairs = [[0,1],[1,2],[2,3],[3,4],[4,5]];
    pairs.forEach(([a, b]) => {
      const scheduleArc = () => {
        if (arcSpawnEnabled && meshes.length > b) {
          spawnArc(meshes[a], meshes[b]);
        }
        timeouts.push(setTimeout(scheduleArc, 800 + Math.random() * 600));
      };
      timeouts.push(setTimeout(scheduleArc, Math.random() * 1000));
    });
  });

  const clock = new THREE.Clock();
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', updateSize);
  updateSize();

  gsap.registerPlugin(ScrollTrigger);
  const trigger = ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      meshes.forEach(m => {
        if (m.material instanceof THREE.ShaderMaterial) {
          m.material.uniforms.uIntensity.value = 1.0 - self.progress;
        }
      });
      arcSpawnEnabled = self.progress < 0.6;
    }
  });

  let animationId: number;
  function animate() {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    camera.position.x = Math.sin(t * 0.15) * 0.4;
    camera.position.y = Math.cos(t * 0.1) * 0.15;
    camera.lookAt(scene.position);

    meshes.forEach((m, i) => {
      if (initialPositions.length <= i) return;
      m.position.y += (Math.sin(t * 0.8 + i * 0.9) * 0.0008);
      m.rotation.y = Math.sin(t * 0.4 + i * 0.5) * 0.04;
      m.position.x += (mouse.x * (0.06 + i * 0.008) - (m.position.x - initialPositions[i].x) * 0.01) * 0.08;
      
      if (m.material instanceof THREE.ShaderMaterial) {
        m.material.uniforms.uTime.value = t;
      }
    });

    composer.render();
  }
  animate();

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', updateSize);
    cancelAnimationFrame(animationId);
    trigger.kill();
    timeouts.forEach(clearTimeout);
    intervals.forEach(clearInterval);
    
    meshes.forEach(m => {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
    renderer.dispose();
  };
}
