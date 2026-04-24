"use client";
import Image from "next/image"; 
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"; 

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-100 via-white to-indigo-100 border-t border-white/60">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 justify-center md:justify-start group">
              <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 p-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">SX</span>
              </div>
              <p className="text-xl sm:text-2xl text-slate-800 font-semibold group-hover:text-indigo-600 transition-colors">
                SkillXchanger
              </p>
            </Link>

            {/* Copyright Line */}
            <div className="text-center md:flex-1 text-slate-600">
              <p className="text-sm sm:text-base leading-6">
                &copy; {new Date().getFullYear()} All rights reserved | Developed with ❤️ by{" "}
                <a
                  href="https://www.linkedin.com/in/ernestemeka25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
                >
                  Ernest.C.
                </a>
              </p>
            </div>

            {/* Quick Links and Social */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:flex-1 md:justify-end">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                <Link href="#" className="hover:text-sky-600 transition-colors font-medium">
                  Chat with Us
                </Link>
                <Link href="#" className="hover:text-sky-600 transition-colors font-medium">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-sky-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xl text-slate-600">
                <a href="#" className="hover:text-sky-600 transition-colors hover:scale-110">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:text-sky-600 transition-colors hover:scale-110">
                  <FaYoutube />
                </a>
                <a href="#" className="hover:text-sky-600 transition-colors hover:scale-110">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}