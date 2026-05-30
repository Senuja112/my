"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-5 z-[100] flex w-full justify-center px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex min-w-[300px] items-center justify-between gap-2 rounded-lg border border-[#d9e6f2] bg-white/90 p-1.5 pl-5 pr-2 shadow-xl shadow-blue-100/60 backdrop-blur-xl md:min-w-0 md:justify-start"
        >
          <ul className="m-0 hidden list-none items-center gap-1 p-0 md:flex">
            {navItems.map((item) => (
              <li key={item.name} className="relative list-none">
                <Link
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={`relative z-10 block rounded-md px-5 py-2 text-sm font-bold no-underline transition-colors duration-300 ${
                    active === item.name ? "text-white" : "text-[#486179] hover:text-[#1d4ed8]"
                  }`}
                >
                  {item.name}
                  {active === item.name && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 z-[-1] rounded-md bg-[#1d4ed8]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex w-full items-center justify-between pr-2 md:hidden">
            <span className="text-sm font-black text-[#0f2742]">Induwara</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eff6ff] p-2 transition-colors hover:bg-[#dbeafe]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <span className={`block h-[2px] w-4 bg-[#1d4ed8] transition-transform ${isMobileMenuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-4 bg-[#1d4ed8] transition-transform ${isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>

          <div className="mx-2 hidden h-6 w-[1px] bg-[#d9e6f2] md:block" />

          <a
            href="https://github.com/clyuu"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-[#f97316] no-underline transition-colors hover:bg-[#fff7ed] md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center space-y-8 bg-white md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-md border border-[#d9e6f2] text-2xl text-[#1d4ed8] transition-colors hover:bg-[#eff6ff]"
              aria-label="Close menu"
            >
              x
            </button>

            <div className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActive(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-4xl font-black uppercase text-[#0f2742] no-underline transition-colors hover:text-[#f97316]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
