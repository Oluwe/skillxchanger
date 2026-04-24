"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TbMenu } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const NAV_LINKS = [
  { href: "/", label: "Home", auth: false },
  { href: "/about", label: "About", auth: false },
  { href: "/dashboard", label: "Dashboard", auth: false },
  { href: "/categories", label: "Categories", auth: false },
  { href: "/post-skill", label: "Post-Skill", auth: true },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300
      ${scrolled
        ? "bg-white/80 shadow-lg py-2"
        : "bg-white/70 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-20 blur-2xl animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="SkillXchanger Logo"
            className={`rounded-full shadow-md transition-all duration-300 ${
              scrolled ? "h-10 w-10" : "h-14 w-14"
            } group-hover:scale-110`}
          />
          <span className="hidden sm:block text-xl font-bold text-gray-800 tracking-wide group-hover:text-indigo-600 transition">
            SkillXchanger
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.filter(link => !link.auth || session).map(link => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {link.label}

                {/* Active underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            );
          })}

          {session?.user?.email && (
            <Link
              href={`/profile?email=${encodeURIComponent(session.user.email)}`}
              className="flex items-center gap-2"
            >
              <img
                src={
                  session.user.image ||
                  "https://ui-avatars.com/api/?name=" +
                    session.user.email
                }
                alt="avatar"
                className="h-9 w-9 rounded-full border border-gray-300"
              />
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut({ redirectTo: "/signin" })}
              className="px-4 py-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 transition shadow-md"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90 transition shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose /> : <TbMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 space-y-3 animate-in fade-in slide-in-from-top duration-300">
          {NAV_LINKS.filter(link => !link.auth || session).map(link => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          {session?.user?.email && (
            <Link
              href={`/profile?email=${encodeURIComponent(session.user.email)}`}
              className="flex items-center gap-2 py-2"
              onClick={() => setMenuOpen(false)}
            >
              <img
                src={
                  session.user.image ||
                  "https://ui-avatars.com/api/?name=" +
                    session.user.email
                }
                alt="avatar"
                className="h-9 w-9 rounded-full border border-gray-300"
              />
              <span className="text-gray-700">Profile</span>
            </Link>
          )}

          {session ? (
            <button
              onClick={() => {
                signOut({ redirectTo: "/signin" });
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="block bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 text-center font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}