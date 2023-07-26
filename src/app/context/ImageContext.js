"use client";

import { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [file, setFile] = useState("");

  return (
    <ImageContext.Provider value={{ file, setFile }}>
      <div>{children}</div>
    </ImageContext.Provider>
  );
};
