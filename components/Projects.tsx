"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Business Landing Page",
    category: "Website Design",
    description: "A clean, conversion-focused landing page for a professional service brand.",
    image: "/p1.png",
  },
  {
    id: 2,
    title: "Portfolio System",
    category: "Frontend Build",
    description: "A responsive personal portfolio with structured sections and smooth interactions.",
    image: "/p2.png",
  },
  {
    id: 3,
    title: "Dashboard Interface",
    category: "UI Engineering",
    description: "A practical web app interface designed for clarity, scanning, and daily use.",
    image: "/p2.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#f8fbff] px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#f97316]">Selected Work</p>
            <h2 className="mt-3 text-4xl font-black text-[#0f2742] md:text-6xl">Projects with a professional finish.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#486179]">
            A portfolio should quickly show taste, trust, and execution quality. These project blocks are designed for that.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group overflow-hidden rounded-lg border border-[#d9e6f2] bg-white shadow-lg shadow-blue-100/40"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#dbeafe]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-2 bg-[linear-gradient(90deg,#f97316,#1d4ed8)]" />
              </div>

              <div className="p-6">
                <p className="text-sm font-bold uppercase text-[#1d4ed8]">{project.category}</p>
                <h3 className="mt-3 text-2xl font-black text-[#0f2742]">{project.title}</h3>
                <p className="mt-4 leading-7 text-[#486179]">{project.description}</p>
                <div className="mt-6 inline-flex h-10 items-center rounded-md bg-[#fff7ed] px-4 text-sm font-bold text-[#c2410c]">
                  View case study
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
