import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, BarChart3, Users, ChevronRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FAQSection from './Faq';
import WinterTales from './Classestells';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  
  // State to track active navigation link
  const [activeTab, setActiveTab] = useState('courses');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const navLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'Guidelines', href: '#guidelines' },
    { name: 'Analytics', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-purple-600 text-white selection:bg-purple-500/10 overflow-x-hidden font-sans">

      {/* 1. BACKGROUND GLOWS & NOISE */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 2. NAVBAR - FLOATING & CENTERED */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 w-10/12 z-50 flex items-center justify-between px-8 py-4 border border-white/10 backdrop-blur-xl bg-black/20 rounded-2xl transition-all duration-300 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <Sparkles size={20} />
          </div>
          <span className="font-bold tracking-tighter text-xl uppercase italic">Classes.io.edu</span>
        </div>

        {/* Persistent Active Links */}
        <div className="hidden md:flex gap-4 text-sm font-medium text-gray-400 bg-black/40 p-1.5 px-3 rounded-xl border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name.toLowerCase())}
              className={`px-4 py-1.5 rounded-lg transition-all duration-300 ${
                activeTab === link.name.toLowerCase()
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                  : "hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate("/login")} className="text-gray-400 hover:text-white">Sign In</Button>
          <Button onClick={() => navigate("/signup")} className="bg-white text-black hover:bg-gray-200 rounded-full px-6">Get Started</Button>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative z-10 pt-48 pb-20 px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-8"
        >
          The Future of Learning
        </motion.div>

        <motion.h1
          {...fadeIn}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mb-8"
        >
          Where Mastery <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Meets Mentorship.
          </span>
        </motion.h1>

        <motion.p
          {...fadeIn}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          A unified marketplace for elite educators and ambitious students.
          Launch your own academy or master a new craft with real-time progress reports.
        </motion.p>

        <motion.div
          {...fadeIn}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button onClick={() => navigate('/student')} className="h-14 px-10 bg-purple-600 hover:bg-purple-700 text-lg font-bold rounded-2xl shadow-xl shadow-purple-900/20">
            Enroll as Student
          </Button>
          <Button onClick={() => navigate('/teacher')} variant="outline" className="h-14 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold rounded-2xl backdrop-blur-md">
            Start Teaching
          </Button>
        </motion.div>
      </section>

      {/* 4. FEATURE GRID */}
      <section className="relative z-10 px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Progress Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-black border border-white/10 backdrop-blur-xl group hover:border-purple-500/50 transition-all"
          >
            <div className="bg-emerald-500/20 p-3 rounded-2xl w-fit mb-6 text-emerald-400">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Progress Reports</h3>
            <p className="text-gray-400 leading-relaxed">
              Visualize your growth with real-time data insights and AI-powered learning path adjustments.
            </p>
          </motion.div>

          {/* Global Marketplace */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 bg-black border border-white/10 backdrop-blur-xl group hover:border-blue-500/50 transition-all"
          >
            <div className="bg-blue-500/20 p-3 rounded-2xl w-fit mb-6 text-blue-400">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Open Marketplace</h3>
            <p className="text-gray-400 leading-relaxed">
              Anyone can offer a course. We provide the tools, the audience, and the infrastructure to scale.
            </p>
          </motion.div>

          {/* Focused Environment */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-black border border-white/10 backdrop-blur-xl group hover:border-indigo-500/50 transition-all"
          >
            <div className="bg-indigo-500/20 p-3 rounded-2xl w-fit mb-6 text-indigo-400">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Focused Study</h3>
            <p className="text-gray-400 leading-relaxed">
              Minimalist interface designed for deep work. No ads, no noise—just pure education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. MOCKUP PREVIEW */}
      <section className="relative z-10 px-8 py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-white/10 to-transparent p-px rounded-[2rem] ">
          <div className="absolute inset-0 opacity-[0.55]"
            style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 2px)`, backgroundSize: '30px 30px' }}
          />
          <div className="bg-[#050505] rounded-[2rem] p-4 md:p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Built for Performance.</h2>
              <div className="space-y-4">
                {[
                  "Interactive Progress Dashboards",
                  "Automated Enrollment Systems",
                  "Secure Teacher Payouts",
                  "Live Interactive Sessions"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex-1">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-2xl relative z-20"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase font-mono">Status: Active</span>
                </div>
                <div className="h-32 w-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center border border-white/5">
                  <div className="flex flex-col items-center">
                    <div className="text-emerald-400 font-bold text-xl flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black">✓</div>
                      Success!
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">Course Enrolled Successfully</p>
                  </div>
                </div>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/30 blur-[80px] z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED COURSES SECTION */}
      <section id="courses" className="relative z-10 px-8 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center tracking-tight">Featured <span className="text-purple-500">Masterclasses</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Advanced React Patterns", instructor: "Sarah Drasner", students: "12k+", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" },
              { title: "System Design for Scale", instructor: "Alex Xu", students: "8.5k+", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" },
              { title: "UI/UX Fundamentals", instructor: "Gary Simon", students: "15k+", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop" }
            ].map((course, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
              >
                <div className="h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{course.title}</h3>
                    <div className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs font-bold uppercase">{course.students}</div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">by {course.instructor}</p>
                  <Button className="w-full bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all">Enroll Now</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GUIDELINES SECTION */}
      <section id="guidelines" className="relative z-10 px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center tracking-tight">How It <span className="text-blue-500">Works</span></h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative p-8 rounded-[2.5rem] border border-white/10 bg-zinc-900/30 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Users size={120} /></div>
              <h3 className="text-3xl font-black mb-8 italic">For Students</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  { step: "01", title: "Create Account", desc: "Sign up and set your learning goals." },
                  { step: "02", title: "Browse & Enroll", desc: "Explore world-class courses and join cohorts." },
                  { step: "03", title: "Track Progress", desc: "Watch analytics update in real-time as you learn." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-purple-500 font-mono font-bold text-xl opacity-50">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/signup')} className="mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 py-6 text-lg font-bold w-full">Start Learning</Button>
            </div>
            <div className="relative p-8 rounded-[2.5rem] border border-white/10 bg-zinc-900/30 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Sparkles size={120} /></div>
              <h3 className="text-3xl font-black mb-8 italic">For Teachers</h3>
              <ul className="space-y-6 relative z-10">
                {[
                  { step: "01", title: "Apply to Teach", desc: "Join our network of elite educators." },
                  { step: "02", title: "Publish Courses", desc: "Create curriculum and manage batches." },
                  { step: "03", title: "Monetize", desc: "Receive payouts directly to your wallet." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-blue-500 font-mono font-bold text-xl opacity-50">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/signup')} className="mt-8 bg-white text-black hover:bg-gray-200 rounded-xl px-8 py-6 text-lg font-bold w-full">Become an Instructor</Button>
            </div>
          </div>
        </div>
      </section>

      <WinterTales />
      <FAQSection />
      <Footer />
    </div>
  );
}