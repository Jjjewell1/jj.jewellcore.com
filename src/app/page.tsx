"use client";

import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Skills } from "@/components/sections/skills";
import { Terminal } from "@/components/sections/terminal";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { LearningTicker } from "@/components/sections/learning";
import { Contact, type ContactHandle } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  const contactRef = useRef<ContactHandle>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Skills />
        <Terminal />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <LearningTicker />
        <Contact ref={contactRef} />
      </main>
      <Footer />
      <Chatbot
        onContactFormReady={(data) => {
          contactRef.current?.prefill(data);
        }}
      />
    </>
  );
}
