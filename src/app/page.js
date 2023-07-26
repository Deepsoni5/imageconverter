"use client";
import { redirect } from "next/navigation";
import Loader from "../app/components/Loader";
import ThreedComponent from "./demo/page";
import { useContext, useRef, useState } from "react";
import { ImageContext } from "./context/ImageContext";
import Link from "next/link";

export default function Home(props) {
  const { file, setFile } = useContext(ImageContext);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file.name) {
      return;
    } else {
      setLoading(true);
      redirect("/demo");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex flex-col justify-center items-center">
      <div
        className="flex items-center justify-center w-8/12"
        onClick={() => onUploadClick()}
      >
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p className="text-white text-base">{file && file.name}</p>
        </label>
      </div>
      <Link
        href="/demo"
        //onClick={handleSubmit}
        type="submit"
        class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {file && loading ? <Loader /> : "Upload"}
      </Link>
    </div>
  );
}
