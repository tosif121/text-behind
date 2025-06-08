"use client";

import { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Parallax transformations
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <>
      <div
        className={cn(
          "w-full items-start overflow-y-auto",
          className
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-10 px-2">
          {/* First Column */}
          <div className="grid gap-10">
            {firstPart.map((el, idx) => (
              <motion.div
                style={{ y: translateFirst }}
                key={"grid-1" + idx}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={el}
                  className="h-auto w-full object-cover rounded-lg"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  placeholder="blur"
                  blurDataURL={el}
                />
              </motion.div>
            ))}
          </div>

          {/* Second Column */}
          <div className="grid gap-10">
            {secondPart.map((el, idx) => (
              <motion.div
                style={{ y: translateSecond }}
                key={"grid-2" + idx}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={el}
                  className="h-auto w-full object-cover rounded-lg"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  placeholder="blur"
                  blurDataURL={el}
                />
              </motion.div>
            ))}
          </div>

          {/* Third Column */}
          <div className="grid gap-10">
            {thirdPart.map((el, idx) => (
              <motion.div
                style={{ y: translateThird }}
                key={"grid-3" + idx}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={el}
                  className="h-auto w-full object-cover rounded-lg"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  placeholder="blur"
                  blurDataURL={el}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking on the image
            >
              <Image
                src={selectedImage}
                alt="Full-screen view"
                layout="intrinsic"
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};