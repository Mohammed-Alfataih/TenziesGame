import { useState } from 'react'
import About from './component/about'
import './App.css'
import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Load Three.js if not already loaded
    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initSpace;
      document.head.appendChild(script);
    } else {
      initSpace();
    }

    function initSpace() {
      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer();
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000011);
      mountRef.current.appendChild(renderer.domElement);
      
      // Stars
      const geometry = new window.THREE.BufferGeometry();
      const positions = new Float32Array(5000 * 3);
      const colors = new Float32Array(5000 * 3);
      const sizes = new Float32Array(5000);
      
      for(let i = 0; i < 5000 * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2000;
        positions[i + 1] = (Math.random() - 0.5) * 2000;
        positions[i + 2] = (Math.random() - 0.5) * 2000;
        
        // Different star colors
        const starType = Math.random();
        if(starType < 0.7) {
          // White stars
          colors[i] = 1.0; colors[i + 1] = 1.0; colors[i + 2] = 1.0;
        } else if(starType < 0.85) {
          // Blue stars
          colors[i] = 0.7; colors[i + 1] = 0.8; colors[i + 2] = 1.0;
        } else {
          // Yellow/orange stars
          colors[i] = 1.0; colors[i + 1] = 0.8; colors[i + 2] = 0.6;
        }
        
        sizes[i / 3] = Math.random() * 3 + 1;
      }
      
      geometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new window.THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new window.THREE.BufferAttribute(sizes, 1));
      
      const material = new window.THREE.PointsMaterial({ 
        vertexColors: true,
        size: 2,
        sizeAttenuation: false
      });
      const stars = new window.THREE.Points(geometry, material);
      scene.add(stars);
      
      camera.position.z = 50;
      
      function animate() {
        requestAnimationFrame(animate);
        stars.rotation.y += 0.001;
        renderer.render(scene, camera);
      }
      animate();
    }
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

function App() {
  return(
    <>
     <SpaceBackground />
     <About />
    </>
  );
}

export default App;