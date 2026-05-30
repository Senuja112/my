"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const tabs = ["About", "Resume", "Portfolio", "Contact"] as const;
type Tab = (typeof tabs)[number];
const portfolioFilters = ["All", "AI Products", "Software", "Websites"] as const;
type PortfolioFilter = (typeof portfolioFilters)[number];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/induwarahasaranga/",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.4 8h4.2v14H.4V8Zm7.25 0h4.02v1.9h.06c.56-1.06 1.93-2.18 3.97-2.18 4.24 0 5.02 2.79 5.02 6.42V22h-4.2v-6.95c0-1.66-.03-3.8-2.31-3.8-2.32 0-2.67 1.81-2.67 3.68V22h-4.2V8Z",
  },
  {
    name: "GitHub",
    href: "https://github.com/clyuu",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
];

const services = [
  {
    title: "Qlony Girl",
    description: "Co-contributed with Kaveesha Lasith to Sri Lanka's first AI girlfriend, built for natural, friendly AI conversations.",
    href: "https://qlony.com/girl",
    icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z",
  },
  {
    title: "Crypto AI",
    description: "Co-built a Sri Lankan crypto AI concept that analyzes market news and real-time data to generate trade-signal insights.",
    href: "https://qlony.com/crypto/",
    icon: "M3 3h2v18H3V3Zm16.59 5.59 1.41 1.41-6.17 6.17-4-4L6.41 16.59 5 15.17l5.83-5.83 4 4 4.76-4.75ZM17 4h4v4h-2V6h-2V4Z",
  },
  {
    title: "Sinhala Business Chatbot",
    description: "Built with Kaveesha Lasith to convert sales in Sinhala, answer from databases in real time, and handle customers up to checkout.",
    href: "https://qlony.com/business/",
    icon: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8 12H7v-2h5v2Zm5-4H7V8h10v2Z",
  },
  {
    title: "Websites & Software",
    description: "Developing full-stack websites, portals, dashboards, and custom software systems for practical business needs.",
    icon: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4ZM13 5h-2l-2 14h2l2-14Z",
  },
];

const skills = [
  {
    name: "Programming",
    icon: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4ZM13 5h-2l-2 14h2l2-14Z",
    items: ["C#", "Python", "Java", "PHP", "HTML", "JavaScript", "TypeScript"],
  },
  {
    name: "Frameworks",
    icon: "M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z",
    items: ["Node.js", "ASP.NET", "React", "Next.js", "Angular", "Flask", "Bootstrap"],
  },
  {
    name: "AI & Chatbots",
    icon: "M12 2a2 2 0 0 1 2 2v1h3a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-1.5L12 21l-3.5-3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3V4a2 2 0 0 1 2-2Zm-4 8.5A1.5 1.5 0 1 0 8 13a1.5 1.5 0 0 0 0-3Zm8 0A1.5 1.5 0 1 0 16 13a1.5 1.5 0 0 0 0-3Zm-7 5h6v-2H9v2Z",
    items: ["AI/ML", "LLM Integration", "Prompt Engineering", "Sinhala Chatbots", "Trade Signals"],
  },
  {
    name: "Databases",
    icon: "M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4Zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2Zm0 14c-3.87 0-6-1.5-6-2v-2.13C7.44 15.75 9.58 16 12 16s4.56-.25 6-1.13V17c0 .5-2.13 2-6 2Zm0-5c-3.87 0-6-1.5-6-2V9.87C7.44 10.75 9.58 11 12 11s4.56-.25 6-1.13V12c0 .5-2.13 2-6 2Z",
    items: ["SQL Server", "MySQL", "Realtime Data", "Database-driven Answers"],
  },
  {
    name: "Tools & Platforms",
    icon: "M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-4.9-2.4-7.3-1.3l4.1 4.1-3.1 3.1-4.2-4C.5 7.3.9 10.2 3 12.2c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.4-.4.4-1 0-1.5Z",
    items: ["Git", "VS Code", "Visual Studio", "Postman", "DigitalOcean", "Cloudflare"],
  },
  {
    name: "Core Knowledge",
    icon: "M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13.18L5 12.36V17l7 4 7-4v-4.64l-7 3.82Z",
    items: ["OOP", "DSA", "REST APIs", "Full Stack Architecture", "DevOps Basics"],
  },
];

const projects = [
  {
    title: "Qlony Girl",
    category: "AI Chatbot",
    image: "/projects/qlony-girl.png",
    href: "https://qlony.com/girl",
    description: "Sri Lanka's first AI girlfriend concept, co-contributed with Kaveesha Lasith.",
    groups: ["AI Products"],
  },
  {
    title: "Qlony Crypto AI",
    category: "AI / Fintech",
    image: "/projects/qlony-crypto-ai.png",
    href: "https://qlony.com/crypto/",
    description: "Realtime market and news analysis concept for crypto trade-signal insights.",
    groups: ["AI Products"],
  },
  {
    title: "Qlony Business Bot",
    category: "AI Sales Bot",
    image: "/projects/qlony-business-bot.png",
    href: "https://qlony.com/business/",
    description: "Sinhala business chatbot for sales conversion, database answers, and order handling.",
    groups: ["AI Products", "Software"],
  },
  {
    title: "Restaurant Management System",
    category: "Full Stack Software",
    image: "/projects/restaurant-management.png",
    description: "Multi-branch restaurant management system evolved from desktop POS to a web portal.",
    groups: ["Software"],
  },
  {
    title: "Emergency Medical Response Portal",
    category: "Health Tech",
    image: "/projects/medical-response-portal.png",
    description: "QR-based health platform for fast emergency access to patient medical information.",
    groups: ["Software"],
  },
  {
    title: "Websites & Software Systems",
    category: "Web Development",
    image: "/projects/websites-software.png",
    description: "Custom websites, dashboards, portals, and software systems built for business needs.",
    groups: ["Websites", "Software"],
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{children}</h1>
      <div className="mt-5 h-1 w-12 rounded-full bg-[#ffd15c]" />
    </div>
  );
}

function IconBox({ path }: { path: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#202020] text-[#ffd15c] shadow-lg shadow-black/30">
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d={path} />
      </svg>
    </div>
  );
}

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("About");
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("All");
  const filteredProjects = activeFilter === "All" ? projects : projects.filter((project) => project.groups.includes(activeFilter));

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "Portfolio contact");
    const message = String(formData.get("message") || "");
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:induhasaranga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-[#101010] px-3 py-4 text-white md:px-6 md:py-12">
      <div className="mx-auto grid max-w-[1220px] gap-6 lg:grid-cols-[310px_1fr]">
        <aside className="rounded-2xl border border-[#383838] bg-[#1f1f21] p-5 shadow-2xl shadow-black/40 lg:sticky lg:top-12 lg:h-fit lg:p-8">
          <div className="flex items-center gap-4 lg:flex-col lg:text-center">
            <Image
              src="/projects/induwara.jpeg"
              alt="Induwara Hasaranga"
              width={150}
              height={150}
              className="h-20 w-20 rounded-2xl object-cover lg:h-36 lg:w-36"
            />
            <div>
              <h2 className="text-2xl font-black leading-tight">Induwara Hasaranga</h2>
              <p className="mt-3 inline-flex max-w-full rounded-md bg-[#2b2b2d] px-4 py-2 text-center text-xs font-semibold leading-5 text-white">AI & ML Engineer and Full Stack Developer</p>
            </div>
          </div>

          <div className="my-7 hidden h-px bg-[#3a3a3a] lg:block" />

          <div className="mt-6 grid gap-4 text-sm lg:mt-0">
            <div className="flex items-center gap-4">
              <IconBox path="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              <div className="min-w-0">
                <p className="text-xs uppercase text-[#a8a8b3]">LinkedIn</p>
                <a href="https://www.linkedin.com/in/induwarahasaranga/" className="block max-w-full break-all font-semibold leading-5 hover:text-[#ffd15c]">
                  linkedin.com/in/induwarahasaranga
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <IconBox path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              <div>
                <p className="text-xs uppercase text-[#a8a8b3]">Location</p>
                <p className="font-semibold">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex justify-center gap-4 text-sm font-bold text-[#a8a8b3]">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#202020] transition hover:bg-[#2d2a20] hover:text-[#ffd15c]"
                aria-label={item.name}
                title={item.name}
              >
                <SocialIcon path={item.path} />
              </a>
            ))}
          </div>
        </aside>

        <section className="overflow-hidden rounded-2xl border border-[#383838] bg-[#1f1f21] shadow-2xl shadow-black/40">
          <nav className="hidden justify-end border-b border-[#383838] bg-[#252526] md:flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-7 py-5 text-sm font-bold transition ${activeTab === tab ? "text-[#ffd15c]" : "text-[#c9c9d0] hover:text-white"}`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="px-5 py-7 md:px-9 md:py-10">
            {activeTab === "About" && (
              <>
                <SectionTitle>About Me</SectionTitle>
                <div className="max-w-4xl text-justify text-[15px] leading-7 text-[#f2f2f5] md:text-base">
                  <p>
                    I&apos;m Induwara Hasaranga, an AI &amp; ML Engineer and Full Stack Developer focused on
                    creating smart, scalable, and impactful digital products. With a strong passion for artificial
                    intelligence, modern web development, and digital innovation, I build solutions that connect
                    technology with real world needs. From responsive web platforms to AI driven applications, my goal is
                    to deliver clean, efficient, and meaningful user experiences. I believe technology is not just about
                    writing code, it is about solving problems, creating value, and building experiences that people
                    enjoy using.
                  </p>
                </div>

                <h2 className="mt-10 text-2xl font-black">What I&apos;m Doing</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {services.map((service) => (
                    <article key={service.title} className="rounded-2xl border border-[#333] bg-[#242426] p-6 shadow-xl shadow-black/25">
                      <div className="flex flex-col gap-4 text-center sm:flex-row sm:text-left">
                        <IconBox path={service.icon} />
                        <div>
                          <h3 className="text-xl font-black">{service.title}</h3>
                          <p className="mt-2 leading-7 text-[#f0f0f3]">{service.description}</p>
                          {service.href && (
                            <a
                              href={service.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex rounded-lg bg-[#2d2a20] px-4 py-2 text-sm font-bold text-[#ffd15c] transition hover:bg-[#393323]"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <h2 className="mt-10 text-2xl font-black">Skills</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {skills.map((skill) => (
                    <article key={skill.name} className="rounded-2xl border border-[#333] bg-[#242426] p-5 shadow-xl shadow-black/20">
                      <div className="flex items-center gap-4">
                        <IconBox path={skill.icon} />
                        <h3 className="text-lg font-black">{skill.name}</h3>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span key={item} className="rounded-md bg-[#2b2b2d] px-3 py-1.5 text-xs font-semibold text-[#e8e8ec]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Resume" && (
              <>
                <SectionTitle>Resume</SectionTitle>
                <div className="space-y-9">
                  {[
                    {
                      type: "Education",
                      title: "BEng (Hons) in Software Engineering",
                      date: "London Metropolitan University (UK)",
                      description: "Degree requirements completed; convocation pending in Sep 2026.",
                    },
                    {
                      type: "Education",
                      title: "Pearson BTEC Level 5 HND in Computing",
                      date: "Esoft Metro Campus - Completed Sep 2025",
                      description: "Completed higher diploma studies with a focus on computing and software development.",
                    },
                    {
                      type: "Experience",
                      title: "Software Engineer Intern",
                      date: "Medcube USA LLC - Sep 2025 to May 2026",
                      description: "Completed an on-site software engineering internship in Colombo, contributing to Angular, .NET Framework, UI implementation, API integration, and full-stack application workflows.",
                    },
                    {
                      type: "Projects",
                      title: "AI Products, Web Platforms, and Business Software",
                      date: "Qlony Girl, Crypto AI, Sinhala Business Chatbot, and custom systems",
                      description: "Built and co-contributed to AI chatbot products, realtime data-driven systems, business automation tools, health-tech portals, and full-stack web platforms.",
                    },
                  ].map((item) => (
                    <div key={`${item.type}-${item.title}`} className="relative border-l border-[#444] pl-8">
                      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#ffd15c] ring-4 ring-[#34302a]" />
                      <p className="text-sm font-bold text-[#ffd15c]">{item.type}</p>
                      <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                      <p className="mt-1 text-[#cfcfd6]">{item.date}</p>
                      <p className="mt-3 max-w-3xl leading-7 text-[#f2f2f5]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href="/cv/induwara-hasaranga-cv.pdf"
                  download
                  className="mt-10 inline-flex rounded-xl bg-[#242426] px-6 py-4 font-bold text-[#ffd15c] shadow-xl shadow-black/30 transition hover:bg-[#2d2a20]"
                >
                  Download CV
                </a>
              </>
            )}

            {activeTab === "Portfolio" && (
              <>
                <SectionTitle>Portfolio</SectionTitle>
                <div className="mb-7 flex flex-wrap gap-5 text-sm font-semibold">
                  {portfolioFilters.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveFilter(item)}
                      className={activeFilter === item ? "text-[#ffd15c]" : "text-white hover:text-[#ffd15c]"}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="grid gap-x-7 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <article key={project.title}>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#111]">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                      <h3 className="mt-4 font-black">{project.title}</h3>
                      <p className="text-[#a8a8b3]">{project.category}</p>
                      <p className="mt-2 text-sm leading-6 text-[#d7d7dc]">{project.description}</p>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex rounded-lg bg-[#2d2a20] px-3 py-2 text-xs font-bold text-[#ffd15c] transition hover:bg-[#393323]"
                        >
                          Visit Project
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Contact" && (
              <>
                <SectionTitle>Contact</SectionTitle>
                <div className="rounded-2xl border border-[#333] bg-[#242426] p-6 shadow-xl shadow-black/25">
                  <h2 className="text-2xl font-black">Let&apos;s build something valuable.</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-[#f2f2f5]">
                    Reach out for AI products, business chatbots, full-stack web platforms, custom software systems,
                    and collaborations around practical digital innovation.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/induwarahasaranga/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-xl bg-[#2d2a20] px-5 py-3 font-bold text-[#ffd15c] shadow-xl shadow-black/20 transition hover:bg-[#393323]"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
                <h2 className="mt-9 text-2xl font-black">Contact Form</h2>
                <form onSubmit={handleContactSubmit} className="mt-6 grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <input name="name" className="rounded-xl border border-[#383838] bg-transparent px-5 py-4 text-white outline-none focus:border-[#ffd15c]" placeholder="Full name" />
                    <input name="email" type="email" className="rounded-xl border border-[#383838] bg-transparent px-5 py-4 text-white outline-none focus:border-[#ffd15c]" placeholder="Email address" />
                  </div>
                  <input name="subject" className="rounded-xl border border-[#383838] bg-transparent px-5 py-4 text-white outline-none focus:border-[#ffd15c]" placeholder="Subject" />
                  <textarea name="message" className="min-h-36 rounded-xl border border-[#383838] bg-transparent px-5 py-4 text-white outline-none focus:border-[#ffd15c]" placeholder="Your Message" />
                  <button type="submit" className="justify-self-end rounded-xl bg-[#242426] px-7 py-4 font-bold text-[#ffd15c] shadow-xl shadow-black/30 transition hover:bg-[#2d2a20]">
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center border-t border-[#383838] bg-[#252526]/95 px-2 py-3 backdrop-blur md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-xs font-bold transition ${activeTab === tab ? "text-[#ffd15c]" : "text-[#c9c9d0]"}`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </main>
  );
}
