"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaExchangeAlt } from "react-icons/fa";

export default function Home() {

  // TYPEWRITER
  const words = ["Request.", "Offer.", "Connect.", "Grow Skills."];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // PARALLAX
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(words[index].slice(0, i));
      i++;
      if (i > words[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
        }, 1200);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <main className="min-h-dvh bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover">

      {/* HERO */}
      <section className="min-h-dvh bg-black/80 flex items-center justify-center relative overflow-hidden">

        {/* PARALLAX WRAPPER */}
        <motion.div
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`
          }}
          className="absolute inset-0"
        />

        {/* GLOW */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-20 blur-3xl animate-pulse"></div>

        {/* FLOATING SKILL BUBBLES */}
        {["React", "UI Design", "Excel", "Python", "Public Speaking"].map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
            className="absolute cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-500/40 transition"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
            }}
          >
            {skill}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-4/5 xl:w-3/4 text-white flex flex-col gap-10 items-center p-6 backdrop-blur-md bg-white/5 rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/10"
        >

          {/* TEXT */}
          <div className="flex flex-col gap-8 text-center items-center">

            <h1 className="md:text-6xl lg:text-7xl text-4xl font-extrabold min-h-[80px]">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                {text}
              </span>{" "}
              <span className="italic">at Zero Cost</span>
            </h1>

            <p className="max-w-3xl text-lg text-gray-200">
              <span className="text-orange-400 font-bold">SkillXchanger</span> lets you exchange real-world skills with real people—no money, just value.
            </p>
          </div>

          {/* HERO IMAGE */}
          <motion.img
            src="/hero.png"
            alt="hero"
            className="w-full max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* LIVE FEED PREVIEW */}
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg">
            <h3 className="text-left font-semibold mb-3">Live Activity</h3>

            <div className="space-y-2 text-sm text-gray-200">
              <p>🟢 John offered <span className="text-orange-400">UI Design</span></p>
              <p>🔵 Sarah requested <span className="text-orange-400">Excel</span></p>
              <p>🟣 Mike exchanged <span className="text-orange-400">React</span></p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-5 max-md:flex-col w-full max-w-lg">
            <Link
              href="/signin"
              className="bg-gradient-to-r from-orange-600 to-yellow-500 px-10 py-4 rounded-xl hover:scale-105 transition text-center font-semibold"
            >
              Start Now
            </Link>

            <Link
              href="/about"
              className="border border-orange-400 px-10 py-4 rounded-xl hover:bg-orange-500 hover:text-white transition text-center font-semibold"
            >
              Learn More
            </Link>
          </div>

        </motion.div>
      </section>

      {/* KEEP OTHER SECTIONS SAME */}

        {/* STATS SECTION */}
              <section className="bg-[url('/bg2.jpg')] bg-no-repeat bg-center bg-cover py-16 px-5 relative">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center relative z-10">
                  {[
                    { icon: <FaUsers />, value: "10K+", label: "Active Learners" },
                    { icon: <FaChalkboardTeacher />, value: "5K+", label: "Skills Shared" },
                    { icon: <FaExchangeAlt />, value: "20K+", label: "Skill Exchanges" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex flex-col items-center gap-3 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <div className="text-4xl text-orange-700">{item.icon}</div>
                      <h3 className="text-3xl font-bold text-gray-800">{item.value}</h3>
                      <p className="text-gray-700">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
        
              {/* HOW IT WORKS */}
              <section className="bg-[url('/bg2.jpg')] bg-no-repeat bg-center bg-cover py-20 px-5 relative">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="max-w-6xl mx-auto flex flex-col gap-12 items-center relative z-10">
                  <h2 className="text-4xl font-bold text-center text-white">
                    How SkillXchanger Works
                  </h2>
        
                  <div className="grid md:grid-cols-3 gap-10 text-center">
                    {[
                      {
                        title: "Offer a Skill",
                        desc: "Share what you know and help others grow while building your own credibility.",
                      },
                      {
                        title: "Request a Skill",
                        desc: "Find people ready to teach what you need and connect easily.",
                      },
                      {
                        title: "Grow Together",
                        desc: "Collaborate, exchange value, and build real-world skills.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col gap-4 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg"
                      >
                        <h3 className="text-2xl font-semibold text-orange-700">
                          {item.title}
                        </h3>
                        <p className="text-gray-700">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* WHY SECTION */}
              <section className="bg-[url('/bg3.jpg')] bg-no-repeat bg-center bg-cover py-20 px-5 relative">
                <div className="absolute inset-0 bg-black/45"></div>
                <div className="max-w-6xl mx-auto flex flex-col gap-12 items-center relative z-10">
                  <h2 className="text-4xl font-bold text-center text-white">
                    Why SkillXchanger?
                  </h2>
        
                  <div className="grid md:grid-cols-3 gap-10 text-center">
                    {[
                      {
                        title: "Zero Cost Learning",
                        desc: "No subscriptions, no hidden fees—just pure knowledge exchange.",
                      },
                      {
                        title: "Real Connections",
                        desc: "Learn directly from real people, not just videos.",
                      },
                      {
                        title: "Global Community",
                        desc: "Join a growing network of learners worldwide.",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col gap-4 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg"
                      >
                        <h3 className="text-2xl font-semibold text-orange-700">
                          {item.title}
                        </h3>
                        <p className="text-gray-700">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* CTA SECTION */}
              <section className="bg-purple-800 py-20 px-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="max-w-4xl mx-auto text-center text-white flex flex-col gap-6 items-center"
                >
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Start Learning Without Limits
                  </h2>
        
                  <p className="text-lg md:text-xl font-light">
                    Join SkillXchanger today and unlock a world where skills are shared,
                    knowledge is free, and growth is limitless.
                  </p>
        
                  <div className="flex gap-5 max-md:flex-col w-full justify-center">
                    <Link
                      href="/signin"
                      className="bg-white text-orange-700 px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-200 max-md:w-full"
                    >
                      Get Started Now
                    </Link>
        
                    <Link
                      href="/about"
                      className="border border-white px-8 py-3 rounded-md hover:bg-white hover:text-orange-700 transition-all duration-200 max-md:w-full"
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </section>
    </main>
  );
}