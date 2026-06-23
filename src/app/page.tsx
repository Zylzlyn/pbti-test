"use client";

import Link from "next/link";
import TextType from "@/components/TextType";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="grain-overlay" />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <TextType
          as="h1"
          text="PBTI"
          typingSpeed={150}
          initialDelay={300}
          loop={false}
          className="text-7xl md:text-9xl font-black text-white mb-6 drop-shadow-lg"
          style={{ letterSpacing: "0.15em" }}
          cursorClassName="text-7xl md:text-9xl font-black text-white drop-shadow-lg"
        />

        <TextType
          as="p"
          text="产品行为类型测试"
          typingSpeed={100}
          initialDelay={1200}
          loop={false}
          className="text-lg md:text-xl mb-12 font-bold drop-shadow leading-relaxed flow-gradient-text"
          cursorClassName="text-lg md:text-xl font-bold"
        />

        <div>
          <Link href="/test"
            className="inline-flex items-center gap-2 bg-white px-10 py-4 rounded-full text-lg font-black transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 pulse-glow-blue">
            <TextType
              as="span"
              text="开始测试"
              typingSpeed={100}
              initialDelay={2500}
              loop={false}
              showCursor={false}
              className="flow-gradient-text"
            />
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[#92A8D1]"><path d="M6 4l8 6-8 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>

    </main>
  );
}
