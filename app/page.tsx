"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // Smooth scroll behavior hack for calmer scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative bg-[#121212] min-h-screen">
      {/* 
        The ScrollyCanvas takes up 500vh of space. 
        The Overlay sits on top of it fixed/sticky logic is handled inside components or by position.
        Actually Overlay is fixed full screen.
      */}

      <Overlay />
      <ScrollyCanvas />

      {/* 
        Projects appear after the canvas scroll space.
        ScrollyCanvas has h-[500vh] so it pushes content down.
      */}
      <Projects />

      <footer className="py-12 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Induwara Hasaranga. All rights reserved.</p>
      </footer>
    </main>
  );
}
