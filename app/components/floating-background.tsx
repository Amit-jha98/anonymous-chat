"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FloatingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const ambient = new THREE.AmbientLight(0xb8fff1, 1.45);
    const key = new THREE.PointLight(0x5eead4, 38, 18);
    key.position.set(-2.5, 2.8, 4.5);
    const warm = new THREE.PointLight(0xf59e0b, 18, 14);
    warm.position.set(3.2, -2.4, 4);
    scene.add(ambient, key, warm);

    const group = new THREE.Group();
    group.position.set(1.7, -0.1, 0);
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.38, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x0f766e,
      emissiveIntensity: 0.35,
      metalness: 0.36,
      opacity: 0.78,
      roughness: 0.18,
      transparent: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.Mesh(
      coreGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xfde68a,
        opacity: 0.2,
        transparent: true,
        wireframe: true,
      }),
    );
    wire.scale.setScalar(1.025);
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x99f6e4,
      opacity: 0.2,
      transparent: true,
    });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.012, 10, 150), ringMaterial);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.32, 0.01, 10, 150), ringMaterial.clone());
    ringA.rotation.set(1.1, 0.2, 0.2);
    ringB.rotation.set(0.35, 1.2, -0.5);
    group.add(ringA, ringB);

    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 12;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xccfbf1,
        depthWrite: false,
        opacity: 0.36,
        size: 0.024,
        transparent: true,
      }),
    );
    scene.add(particles);

    const resize = () => {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const render = (time = 0) => {
      const seconds = time * 0.001;
      group.rotation.x = seconds * 0.18;
      group.rotation.y = seconds * 0.28;
      group.rotation.z = Math.sin(seconds * 0.25) * 0.12;
      group.position.y = Math.sin(seconds * 0.75) * 0.18 - 0.08;
      particles.rotation.y = seconds * 0.035;
      particles.rotation.x = Math.sin(seconds * 0.18) * 0.08;
      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wire.material.dispose();
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      ringMaterial.dispose();
      (ringB.material as THREE.Material).dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-80 mix-blend-screen"
      />
      <div className="surface-grid absolute inset-0 opacity-70" />
      <div className="rain-field rain-field-fast absolute inset-0" />
      <div className="rain-field rain-field-slow absolute inset-0" />
      <motion.div
        className="absolute left-0 top-28 h-px w-full bg-gradient-to-r from-transparent via-teal-200/35 to-transparent"
        animate={{ x: ["-18%", "18%", "-18%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-200/25 to-transparent"
        animate={{ x: ["14%", "-14%", "14%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
