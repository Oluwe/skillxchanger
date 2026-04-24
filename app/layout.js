import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientNavbarWrapper from "./ClientNavbarWrapper";
import Footer from "@/components/Footer";

import { Providers } from "./providers";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillXchanger | Free Skill Exchange Platform",
  description:
    "Learn or teach skills, connect with learners and grow together at zero cost",
  openGraph: {
    title: "SkillXchanger | Free Skill Exchange Platform",
    description:
      "Learn or teach skills, connect with learners and grow together at zero cost",
    url: "https://skillxchanger.com/",
    siteName: "SkillXchanger",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "SkillXchanger Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillXchanger | Free Skill Exchange Platform",
    description:
      "Learn or teach skills, connect with learners and grow together at zero cost",
    images: ["/logo.png"],
    site: "@skillxchanger",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
