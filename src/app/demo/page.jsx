"use client";
import React, { useContext, useEffect } from "react";
import { ImageContext } from "../context/ImageContext";
import ThreeScene from "../components/ThreeScene";

const ThreedComponent = () => {
  // eslint-disable-next-line @next/next/no-sync-scripts

  const { file } = useContext(ImageContext);
  const imageUrl = "/apps.jpg"; // Replace with the path to your image
  useEffect(() => {
    console.log("useEffect is running"); // Add a simple console log to check if useEffect runs
  }, []);

  return (
    <div>
      <h1>3D Image with Three.js</h1>
      <ThreeScene imageUrl={imageUrl} />
    </div>
  );
};

export default ThreedComponent;
