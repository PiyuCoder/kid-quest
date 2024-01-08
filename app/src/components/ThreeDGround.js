// src/components/ThreeDGround.js
import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeDGround = () => {
  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // Set up the ground
    const groundGeometry = new THREE.CircleGeometry(5, 32); // Increase the segments for a smoother circle
    const groundMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate the ground to be parallel with the camera
    ground.position.y = 1; // Adjust the height of the ground
    scene.add(ground);

    // Set up the camera position
    camera.position.set(0, 5, 5);

    // Set up the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light to cast shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Enable shadow casting
    ground.castShadow = true;
    directionalLight.castShadow = true;

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Perform animations or updates here

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      // Additional cleanup if needed
    };
  }, []); // Empty dependency array to run the effect only once

  return null; // No need to render anything in this component
};

export default ThreeDGround;
