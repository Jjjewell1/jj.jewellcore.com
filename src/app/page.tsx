"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Terminal } from "@/components/sections/terminal";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { LearningTicker } from "@/components/sections/learning";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Terminal />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <LearningTicker />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
