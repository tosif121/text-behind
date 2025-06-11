"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, DragEvent } from "react";

const Dropzone = ({
  setSelectedImage,
}: {
  setSelectedImage: (file?: File) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handles the drag-over event to allow dropping
  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Sets dragging state to true when a file enters the drop zone
  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Resets dragging state when a file leaves the drop zone
  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Processes the dropped file
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Ensure the dropped file is an image
      if (files[0].type.startsWith("image/")) {
        setSelectedImage(files[0]);
      }
    }
  };

  return (
    <div>
      <Link className="flex items-center gap-2 mb-2" href="/">
        <ArrowLeft className="h-4 w-4" />
        <p className="leading-7">Go back</p>
      </Link>
      <input
        onChange={(e) => setSelectedImage(e.target.files?.[0])}
        className="hidden"
        type="file"
        id="file-upload"
        accept="image/*"
      />
      <motion.label
        htmlFor="file-upload"
        initial={false}
        whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-black bg-white px-10 py-12 transition-shadow hover:shadow-md hover:shadow-gray-400"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`pointer-events-none absolute inset-2 rounded-xl border-2 border-dashed transition-colors ${
            isDragging ? "border-blue-500" : "border-black"
          }`}
        ></div>
        <svg
          width="47"
          height="47"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="z-10"
        >
          <path
            d="M41.125 23.5V37.2083C41.125 38.2471 40.7124 39.2433 39.9778 39.9778C39.2433 40.7124 38.2471 41.125 37.2083 41.125H9.79167C8.7529 41.125 7.75668 40.7124 7.02216 39.9778C6.28765 39.2433 5.875 38.2471 5.875 37.2083V9.79167C5.875 8.7529 6.28765 7.75668 7.02216 7.02216C7.75668 6.28765 8.7529 5.875 9.79167 5.875H23.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M31.3333 9.79167H43.0833"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.2083 3.91667V15.6667"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.625 21.5417C19.7881 21.5417 21.5417 19.7881 21.5417 17.625C21.5417 15.4619 19.7881 13.7083 17.625 13.7083C15.4619 13.7083 13.7083 15.4619 13.7083 17.625C13.7083 19.7881 15.4619 21.5417 17.625 21.5417Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M41.125 29.375L35.0816 23.3316C34.3471 22.5973 33.3511 22.1848 32.3125 22.1848C31.2739 22.1848 30.2779 22.5973 29.5434 23.3316L11.75 41.125"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="z-10 text-lg font-medium text-black">
          {isDragging ? "Drop image here" : "Upload Image"}
        </p>
        <p className="z-10 text-sm text-gray-500">
          Or drag and drop
        </p>
      </motion.label>
    </div>
  );
};

export default Dropzone;