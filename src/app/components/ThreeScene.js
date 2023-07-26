// components/ThreeScene.js
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = ({ imageUrl }) => {
  const canvasRef = useRef();
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const rotationSpeed = 0.02; // Adjust the rotation speed as desired
  const mouseThreshold = 0.005; // Adjust the mouse movement threshold as desired

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Load the image texture
    const textureLoader = new THREE.TextureLoader();
    const imageTexture = textureLoader.load(imageUrl);

    // Create a box geometry to display the image
    const boxWidth = 5; // Width of the box
    const boxHeight = 1; // Smaller height for a flat 3D card
    const boxDepth = 5; // Depth of the box
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Create a material with the image texture
    const material = new THREE.MeshBasicMaterial({ map: imageTexture });

    // Create the mesh and add it to the scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh; // Store the mesh in a ref for access in the animation loop

    // Add lighting to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the mesh based on mouse direction
      if (meshRef.current) {
        const targetRotationX = (mouse.current.x - 0.5) * rotationSpeed;
        const targetRotationY = (mouse.current.y - 0.5) * rotationSpeed;

        meshRef.current.rotation.y +=
          (targetRotationX - meshRef.current.rotation.y) * mouseThreshold;
        meshRef.current.rotation.x +=
          (targetRotationY - meshRef.current.rotation.x) * mouseThreshold;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize the renderer when the window size changes
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Mouse move event listener to track mouse direction
    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX / window.innerWidth;
      mouse.current.y = event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} />;
};

export default ThreeScene;
