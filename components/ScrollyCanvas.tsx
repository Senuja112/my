"use client";

import { useScroll, useMotionValueEvent, useTransform, AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      };

      const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const paddedIndex = String(i).padStart(3, "0");
          img.src = `/sequence/${paddedIndex}.png`;

          img.onload = () => {
            loadedImages[i] = img;
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed frame: ${i}`);
            resolve();
          }
        });
      });

      await Promise.all(promises);
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (!imagesLoaded) return;
    const frameIndex = Math.round(latest);
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        renderFrame(Math.round(currentIndex.get()));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />

        <AnimatePresence>
          {!imagesLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#121212] z-50 flex flex-col items-center justify-center text-white"
            >
              <p className="text-sm uppercase tracking-widest mb-4 text-gray-400">Loading Experience</p>
              <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
