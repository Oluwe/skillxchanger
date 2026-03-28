"use client";
import Image from "next/image"; 
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"; 

export default function Footer() {
  return (
    <main className="flex flex-col md:flex-row md:items-center md:justify-between border-t border-gray-300 px-4 sm:px-6 md:px-10 py-4 sm:py-6 space-y-4 md:space-y-0 md:space-x-6">

      {/* Logo Section */}
      <div className="flex items-center gap-2 justify-center md:justify-start md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-6 transition-all duration-300 hover:scale-105">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={700}
          height={700} 
          className="w-16 h-16 sm:w-20 sm:h-20"
        />  
        <p className="text-2xl sm:text-3xl text-stone-800 font-bold">skillXchanger</p>          
      </div>

      {/* Copyright Line */}
      <div className="text-center text-sm sm:text-base md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-6 transition-colors duration-300 hover:text-blue-600">
        &copy; {new Date().getFullYear()} SkillXchanger. All rights reserved  Developed by{" "}
        <a
          href="https://www.linkedin.com/in/ernestemeka25"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ernest Chukwuemeka
        </a>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-sm text-gray-700 justify-center md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-6">
        <Link href={"#"} className="hover:text-blue-600 transition-colors duration-300">Chat with Us</Link>
        <Link href={"#"} className="hover:text-blue-600 transition-colors duration-300">Terms of Service</Link>
        <Link href={"#"} className="hover:text-blue-600 transition-colors duration-300">Privacy Policy</Link>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 sm:gap-5 text-2xl text-gray-700 justify-center md:flex-1">
        <FaFacebook className="hover:text-blue-600 transition-transform duration-300 hover:scale-110"/>
        <FaYoutube className="hover:text-red-600 transition-transform duration-300 hover:scale-110"/>
        <FaInstagram className="hover:text-pink-500 transition-transform duration-300 hover:scale-110"/>
      </div>

    </main>
  )
}