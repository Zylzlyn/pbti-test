"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DEEP_BLUE = new THREE.Color("#0052d4");
const DEEP_PINK = new THREE.Color("#f5576c");

const PLANET_RADIUS = 1.0;
const MIN_RADIUS = 2.2;
const MAX_RADIUS = 14.0;

export default function PlanetScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    container.appendChild(renderer.domElement);

    // ===================== CREATE PLANET =====================
    const planetParticleCount = 10000;
    const planetPositions = new Float32Array(planetParticleCount * 3);
    const planetColors = new Float32Array(planetParticleCount * 3);
    const planetSizes = new Float32Array(planetParticleCount);

    for (let i = 0; i < planetParticleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const u1 = Math.random();
      const u2 = Math.random();
      const gaussian =
        Math.sqrt(-2 * Math.log(Math.max(u1, 0.0001))) *
        Math.cos(2 * Math.PI * u2) *
        0.035;
      const r = PLANET_RADIUS + gaussian;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      planetPositions[i * 3] = x;
      planetPositions[i * 3 + 1] = y;
      planetPositions[i * 3 + 2] = z;

      const t = (y / PLANET_RADIUS + 1) / 2;
      const color = new THREE.Color().copy(DEEP_BLUE).lerp(DEEP_PINK, t);
      color.r += (Math.random() - 0.5) * 0.15;
      color.g += (Math.random() - 0.5) * 0.15;
      color.b += (Math.random() - 0.5) * 0.15;

      planetColors[i * 3] = color.r;
      planetColors[i * 3 + 1] = color.g;
      planetColors[i * 3 + 2] = color.b;

      planetSizes[i] = 0.018 + Math.random() * 0.018;
    }

    const planetGeometry = new THREE.BufferGeometry();
    planetGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(planetPositions, 3)
    );
    planetGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(planetColors, 3)
    );
    planetGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(planetSizes, 1)
    );

    const planetMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.85,
    });

    const planet = new THREE.Points(planetGeometry, planetMaterial);
    scene.add(planet);

    // ===================== CREATE RING 1 (inner) =====================
    function createRing(
      rInner: number,
      rOuter: number,
      count: number,
      tiltX: number,
      tiltZ: number,
      opacity: number
    ): THREE.Points {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = rInner + Math.random() * (rOuter - rInner);

        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 0.045;
        const z = Math.sin(angle) * radius;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const brightness = 0.75 + Math.random() * 0.25;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness + (Math.random() - 0.5) * 0.08;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.012,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity,
      });

      const ring = new THREE.Points(geometry, material);
      ring.rotation.x = tiltX;
      ring.rotation.z = tiltZ;
      return ring;
    }

    const ring1 = createRing(1.3, 1.65, 4000, Math.PI * 0.42, Math.PI * 0.06, 0.65);
    scene.add(ring1);

    const ring2 = createRing(1.65, 2.05, 3500, Math.PI * 0.48, -Math.PI * 0.09, 0.45);
    scene.add(ring2);

    // ===================== BACKGROUND STARS =====================
    const starCount = 2500;
    const starPositionsArr = new Float32Array(starCount * 3);
    const starColorsArr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 12;
      starPositionsArr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositionsArr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositionsArr[i * 3 + 2] = r * Math.cos(phi);

      const twinkle = 0.3 + Math.random() * 0.7;
      starColorsArr[i * 3] = twinkle;
      starColorsArr[i * 3 + 1] = twinkle;
      starColorsArr[i * 3 + 2] = twinkle + (Math.random() - 0.5) * 0.2;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositionsArr, 3)
    );
    starGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColorsArr, 3)
    );
    const starMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.55,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ===================== CAMERA STATE =====================
    const cam = {
      theta: 0,
      targetTheta: 0,
      phi: Math.PI / 2.2,
      radius: 5.0,
      targetRadius: 5.0,
      autoTheta: 0,
      radiusVelocity: 0,
    };

    function updateCameraPosition() {
      const r = cam.radius;
      const t = cam.theta + cam.autoTheta;
      const p = cam.phi;
      camera.position.x = r * Math.sin(p) * Math.cos(t);
      camera.position.y = r * Math.cos(p);
      camera.position.z = r * Math.sin(p) * Math.sin(t);
      camera.lookAt(0, 0, 0);
    }

    // ===================== HAND GESTURE STATE =====================
    let rawHandX = 0;
    let rawHandZ = 0;
    let smoothHandX = 0;
    let smoothHandZ = 0;
    let prevSmoothHandX = 0;
    let handGestureScore = 0.5;
    let handPresentBlend = 0;
    let zoomIntensity = 0;
    let isHandPresent = false;

    function computeGestureScore(landmarks: Array<{ x: number; y: number; z: number }>): number {
      const wrist = landmarks[0];
      const tips = [4, 8, 12, 16, 20];
      let avgDist = 0;
      for (const idx of tips) {
        const dx = landmarks[idx].x - wrist.x;
        const dy = landmarks[idx].y - wrist.y;
        avgDist += Math.sqrt(dx * dx + dy * dy);
      }
      avgDist /= tips.length;
      return Math.max(0, Math.min(1, (avgDist - 0.16) / 0.25));
    }

    function computeZoomIntensity(landmarks: Array<{ x: number; y: number; z: number }>): number {
      const wrist = landmarks[0];
      const indexTip = landmarks[8];
      const dx = indexTip.x - wrist.x;
      const dy = indexTip.y - wrist.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.13) return -2;
      if (dist < 0.18) return -1;
      if (dist < 0.28) return -0.5;
      if (dist > 0.42) return 1;
      if (dist > 0.36) return 0.5;
      if (dist > 0.30) return 0.25;
      return 0;
    }

    // ===================== ANIMATION LOOP (delta-time based) =====================
    let animationId: number;
    let lastTime = performance.now();
    const EPSILON = 0.0001;

    function animate() {
      animationId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (dt < EPSILON) return;

      cam.autoTheta += 0.05 * dt;

      const handBlendTarget = isHandPresent ? 1 : 0;
      handPresentBlend += (handBlendTarget - handPresentBlend) * Math.min(8 * dt, 1);

      const thetaSpringStiffness = isHandPresent ? 12 : 3;
      const thetaSpringDamping = isHandPresent ? 6 : 2;
      cam.theta += (cam.targetTheta - cam.theta) * thetaSpringStiffness * dt;
      cam.targetTheta += -cam.targetTheta * thetaSpringDamping * dt;

      if (!isHandPresent && handPresentBlend < 0.05) {
        cam.targetRadius = 5.0;
      }

      const radiusSpringStiffness = 4;
      const radiusSpringDamping = 2.8;
      const radiusError = cam.targetRadius - cam.radius;
      cam.radiusVelocity += radiusError * radiusSpringStiffness * dt;
      cam.radiusVelocity *= Math.max(0, 1 - radiusSpringDamping * dt);
      cam.radius += cam.radiusVelocity * dt;

      cam.radius = THREE.MathUtils.clamp(cam.radius, MIN_RADIUS, MAX_RADIUS);
      if (cam.radius <= MIN_RADIUS + 0.01) cam.radiusVelocity = Math.max(0, cam.radiusVelocity);
      if (cam.radius >= MAX_RADIUS - 0.01) cam.radiusVelocity = Math.min(0, cam.radiusVelocity);

      updateCameraPosition();

      planet.rotation.y += 0.02 * dt;
      ring1.rotation.z += 0.015 * dt;
      ring2.rotation.z -= 0.01 * dt;
      stars.rotation.y += 0.005 * dt;

      renderer.render(scene, camera);
    }
    animate();

    // ===================== RESIZE =====================
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // ===================== MEDIAPIPE HAND TRACKING =====================
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let handsInstance: any = null;
    let lastProcessTime = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function loadMediaPipe(): Promise<any> {
      return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof window !== "undefined" && (window as any).Hands) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resolve((window as any).Hands);
          return;
        }
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js";
        script.crossOrigin = "anonymous";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        script.onload = () => resolve((window as any).Hands);
        script.onerror = () => {
          console.warn("MediaPipe Hands 加载失败，使用鼠标/触摸作为后备");
          resolve(null);
        };
        document.head.appendChild(script);
      });
    }

    async function initHandTracking() {
      const Hands = await loadMediaPipe();
      if (!Hands) return;

      handsInstance = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
      });

      handsInstance.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handsInstance.onResults((results: any) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];

          isHandPresent = true;

          const wrist = landmarks[0];
          rawHandX = wrist.x;
          rawHandZ = wrist.z;

          const emaAlpha = 0.3;
          smoothHandX += (rawHandX - smoothHandX) * emaAlpha;
          smoothHandZ += (rawHandZ - smoothHandZ) * emaAlpha;

          const deltaX = smoothHandX - prevSmoothHandX;

          prevSmoothHandX = smoothHandX;

          const gestureScore = computeGestureScore(landmarks);
          handGestureScore += (gestureScore - handGestureScore) * 0.15;

          const rawZoomIntensity = computeZoomIntensity(landmarks);
          zoomIntensity += (rawZoomIntensity - zoomIntensity) * 0.15;

          if (Math.abs(deltaX) > 0.0005) {
            cam.targetTheta += deltaX * 3.5;
          }

          const effectiveZoom = zoomIntensity * handPresentBlend;
          if (Math.abs(effectiveZoom) > 0.1) {
            const zoomSpeed = Math.abs(effectiveZoom) * 3.5;
            const zoomDir = Math.sign(effectiveZoom);
            const springAccel = zoomDir * zoomSpeed * zoomSpeed * 1.2;
            cam.targetRadius += springAccel * 0.016;
            cam.targetRadius = THREE.MathUtils.clamp(cam.targetRadius, MIN_RADIUS, MAX_RADIUS);
          }
        } else {
          isHandPresent = false;
        }
      });

      const video = videoRef.current;
      if (!video) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
        });
        video.srcObject = stream;
        await video.play();

        async function processFrame() {
          if (!handsInstance || !video || video.readyState < 2) {
            requestAnimationFrame(processFrame);
            return;
          }
          const now = performance.now();
          if (now - lastProcessTime > 50) {
            await handsInstance.send({ image: video });
            lastProcessTime = now;
          }
          requestAnimationFrame(processFrame);
        }
        processFrame();
      } catch {
        console.warn("摄像头不可用，使用默认旋转");
      }
    }

    initHandTracking();

    // ===================== MOUSE/TOUCH FALLBACK =====================
    let isPointerDown = false;
    let pointerPrevX = 0;

    function onPointerDown(e: PointerEvent) {
      isPointerDown = true;
      pointerPrevX = e.clientX;
    }

    function onPointerMove(e: PointerEvent) {
      if (!isPointerDown || isHandPresent) return;
      const dx = e.clientX - pointerPrevX;
      pointerPrevX = e.clientX;
      cam.targetTheta += dx * 0.005;
    }

    function onPointerUp() {
      isPointerDown = false;
    }

    function onWheel(e: WheelEvent) {
      if (isHandPresent) return;
      e.preventDefault();
      const zoomStep = -e.deltaY * 0.003;
      cam.targetRadius += zoomStep;
      cam.targetRadius = THREE.MathUtils.clamp(cam.targetRadius, MIN_RADIUS, MAX_RADIUS);
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      if (handsInstance) handsInstance.close();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        muted
      />
    </div>
  );
}
