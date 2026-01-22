"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Neon Horizon",
        category: "WebGL Experience",
        description: "A 3D immersive journey through a synthwave cityscape.",
        image: "/p1.png",
        colSpan: "md:col-span-2"
    },
    {
        id: 2,
        title: "Vortex",
        category: "E-Commerce",
        description: "High-performance headless shopify store with liquid motion.",
        image: "/p2.png",
        colSpan: "md:col-span-1"
    },
    {
        id: 3,
        title: "Echo",
        category: "AI Dashboard",
        description: "Real-time data visualization platform with predictive analytics.",
        image: "/p2.png", // Reusing for demo
        colSpan: "md:col-span-1"
    },
    {
        id: 4,
        title: "Mirage",
        category: "Portfolio",
        description: "Award-winning personal site featuring micro-interactions.",
        image: "/p1.png", // Reusing for demo
        colSpan: "md:col-span-2"
    }
];

export default function Projects() {
    return (
        <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <h2 className="text-[12vw] leading-[0.8] font-black text-white tracking-tighter uppercase mix-blend-difference">
                        Selected <br /> Works
                    </h2>
                    <div className="flex flex-col items-end">
                        <span className="text-white/50 text-sm uppercase tracking-widest mb-2">(2023 — 2025)</span>
                        <p className="text-gray-400 text-lg max-w-xs text-right hidden md:block">
                            Digital experiences crafted with code, passion, and precision.
                        </p>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`group relative h-[50vh] md:h-[60vh] overflow-hidden rounded-md bg-gray-900 ${project.colSpan}`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white uppercase tracking-wider bg-black/30 backdrop-blur-md">
                                        {project.category}
                                    </span>
                                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        →
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
