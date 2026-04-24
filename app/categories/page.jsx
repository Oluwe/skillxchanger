"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/skills");
      if (!res.ok) {
        console.error("Failed to fetch skills:", res.status);
        setCategories({});
        return;
      }
      const skills = await res.json();

      // Group skills by category
      const grouped = skills.reduce((acc, skill) => {
        const cat = skill.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {});

      setCategories(grouped);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-100 px-4">
        <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-6 shadow-2xl backdrop-blur-xl text-slate-700">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 rounded-[2rem] border border-white/70 bg-white/80 p-10 shadow-2xl backdrop-blur-xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
            Skill Categories
          </h1>
          <p className="text-lg text-slate-600 leading-8 max-w-3xl">
            Discover a welcoming collection of skills organized by category. Every listing is crafted to help you connect, learn, and share with the SkillXchanger community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(categories).map(([category, skills]) => (
            <div
              key={category}
              className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                {category}
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-3">
                {skills.length}
              </p>
              <p className="text-slate-500 mb-6 leading-7">
                {skills.length} skill{skills.length !== 1 ? "s" : ""} available in this category.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                View Skills
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {Object.keys(categories).length === 0 && (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-200 bg-white/90 p-10 text-center text-slate-500 shadow-lg">
            No skills posted yet. Check back soon for fresh connections.
          </div>
        )}
      </div>
    </div>
  );
}
