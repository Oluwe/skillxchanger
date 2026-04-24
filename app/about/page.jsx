import Link from "next/link"
import { FaUsers, FaGraduationCap, FaGlobe, FaLightbulb, FaShieldAlt, FaHeartbeat } from "react-icons/fa"

export const metadata = {
  title: "About SkillXchanger | Free Skill Exchange Platform",
  description: "Learn about SkillXchanger - a free peer-to-peer skill exchange platform designed to break barriers to learning"
}

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-orange-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SkillXchanger</h1>
          <p className="text-xl mb-6 text-orange-100">
            A Free Peer-to-Peer Skill Exchange Platform
          </p>
          <p className="text-lg text-orange-50 max-w-3xl mx-auto">
            Breaking barriers to learning by connecting people who want to teach with those who want to learn—completely free, locally-focused, and community-driven.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg mb-4">
                In today's digital and knowledge-driven world, access to skills is essential for personal growth, employability, and entrepreneurship. However, many students, freelancers, and young people face significant barriers to acquiring new skills.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                While online learning platforms such as Udemy, Edx, and Coursera exist, they often require payment and are not tailored to localized, peer-to-peer engagement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-2xl" />
                The Solution
              </h3>
              <p className="text-gray-700">
                SkillXchanger is a simple, public web-based platform designed to enable individuals to exchange knowledge and skills without financial cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">The Problem We Solve</h2>
          <p className="text-gray-700 text-lg mb-8">
            A large number of individuals globally—and especially in developing regions—experience these challenges:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-2">💰 Financial Barriers</h3>
              <p className="text-gray-700">
                Inability to afford paid online courses keeps many from developing new skills and advancing careers.
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-2">👨‍🏫 Limited Access to Mentors</h3>
              <p className="text-gray-700">
                Lack of access to credible mentors or trainers within communities hinders skill development.
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-2">🔍 Awareness Gap</h3>
              <p className="text-gray-700">
                Lack of awareness of who can teach or guide them locally creates missed learning opportunities.
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-2">📊 Underutilized Resources</h3>
              <p className="text-gray-700">
                Existing skills within communities remain unused, leading to unemployment and underemployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How SkillXchanger Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Sign In", desc: "Create an account with your basic info (name, email, phone)" },
              { step: "2", title: "Post Skills", desc: "Share what you can teach or what you want to learn" },
              { step: "3", title: "Browse", desc: "Browse all skills posted by community members" },
              { step: "4", title: "Connect", desc: "Contact people directly and start exchanging skills offline" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-orange-600 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: FaShieldAlt, title: "Simple Authentication", desc: "Basic login without complex verification processes" },
              { icon: FaGraduationCap, title: "Skill Posting", desc: "Users can list skills they offer or want to learn" },
              { icon: FaGlobe, title: "Public Display Board", desc: "All posts visible in a shared feed accessible to everyone" },
              { icon: FaUsers, title: "Direct Contact Sharing", desc: "Enable direct offline peer-to-peer communication" },
              { icon: FaHeartbeat, title: "No Admin Panel", desc: "Fully decentralized and self-sustaining platform" },
              { icon: FaLightbulb, title: "Simple Technology", desc: "Operates with straightforward web technologies only" }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition">
                  <Icon className="text-3xl text-orange-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* Target Users */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Who Can Use SkillXchanger?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎓", title: "Students", desc: "Learn new skills without expensive courses" },
              { icon: "💼", title: "Freelancers", desc: "Expand your skill set and network" },
              { icon: "🌍", title: "Communities", desc: "Build local learning ecosystems" },
              { icon: "🚀", title: "Entrepreneurs", desc: "Connect with mentors and learners" },
              { icon: "👥", title: "Professionals", desc: "Share expertise and learn from others" },
              { icon: "🌱", title: "Youth", desc: "Access quality education affordably" },
              { icon: "🏢", title: "Organizations", desc: "Support employee development" },
              { icon: "🌐", title: "Everyone", desc: "Anyone willing to teach or learn" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
  )
}