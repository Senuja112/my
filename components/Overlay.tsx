"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.45], [100, -100]);

    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.5, 0.7], [100, -100]);

    return (
        <div className="fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-center min-h-screen w-full mix-blend-difference text-white">

            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="text-center px-4"
            >
                <h1 className="text-[12vw] font-black tracking-tighter leading-none mb-2">
                    CREATIVE <br /> DEV.
                </h1>
                <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase opacity-80">
                    Induwara Hasaranga
                </p>
            </motion.div>

            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute left-4 md:left-32 max-w-[90vw] md:max-w-4xl"
            >
                <h2 className="text-[10vw] md:text-[8vw] font-bold leading-none tracking-tight break-words">
                    DIGITAL <br /> ALCHEMY.
                </h2>
            </motion.div>

            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute right-4 md:right-32 text-right max-w-[90vw] md:max-w-4xl"
            >
                <h2 className="text-[10vw] md:text-[8vw] font-bold leading-none tracking-tight break-words">
                    CODE <br /> AS DESIGN.
                </h2>
            </motion.div>

        </div>
    );
}
