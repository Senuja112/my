"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [active, setActive] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0] as [number, number, number, number],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <>
            <div className="fixed top-8 left-0 right-0 z-[100] flex justify-center px-4 w-full pointer-events-none">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-auto flex items-center justify-between md:justify-start gap-2 p-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl shadow-black/50 pl-6 pr-2 min-w-[300px] md:min-w-0"
                >
                    {/* Logo/Name for Mobile Context if needed, or just keep centered? 
                        The original design was just links. 
                        Let's keep the pill shape but ensure it looks good.
                    */}

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-1 list-none p-0 m-0">
                        {navItems.map((item) => (
                            <li key={item.name} className="relative list-none">
                                <Link
                                    href={item.href}
                                    onClick={() => setActive(item.name)}
                                    className={`relative z-10 block px-5 py-2 text-sm font-medium transition-colors duration-300 no-underline ${active === item.name ? "text-black" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                    {active === item.name && (
                                        <motion.div
                                            layoutId="nav-bg"
                                            className="absolute inset-0 bg-white rounded-full z-[-1]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle - Pushed to right via flex w-full or similar */}
                    <div className="flex md:hidden w-full items-center justify-between pr-2">
                        <span className="text-sm font-medium text-white/80 tracking-widest uppercase">Menu</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                        >
                            <div className="flex flex-col gap-1">
                                <span className={`block w-4 h-[1px] bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
                                <span className={`block w-4 h-[1px] bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`} />
                            </div>
                        </button>
                    </div>

                    <div className="w-[1px] h-6 bg-white/10 mx-2 hidden md:block" />

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-full transition-colors no-underline"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </motion.nav>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-[90] bg-[#121212] flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        <div className="absolute top-8 right-8">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            {navItems.map((item) => (
                                <motion.div key={item.name} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => { setActive(item.name); setIsMobileMenuOpen(false); }}
                                        className="text-4xl md:text-5xl font-light text-white tracking-widest uppercase hover:text-gray-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
