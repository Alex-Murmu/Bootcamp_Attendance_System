import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020202] text-white pt-24 pb-12 px-8 border-t border-white/5 relative overflow-hidden">
      {/* 1. TOP SECTION: CTA & NAV COLUMNS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        
        {/* Brand Catchphrase */}
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-4xl font-bold tracking-tight max-w-sm leading-tight">
            Build the future of learning in minutes, <span className="text-gray-500 italic">not days.</span>
          </h2>
          
          {/* Experience Rating (Mimicking the reference) */}
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Rate your experience</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="text-gray-600 hover:text-purple-500 cursor-pointer transition-colors" />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="md:col-span-2 space-y-6 border-l border-white/30 pl-8">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Platform</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-purple-500 hover:font-bold transition- transition-colors cursor-pointer">Marketplace</li>
            <li className="hover:text-purple-500 hover:font-bold transition- transition-colors cursor-pointer flex items-center gap-2">
              Teacher Studio <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/10">🔒</span>
            </li>
            <li className="hover:text-purple-500 hover:font-bold transition- transition-colors cursor-pointer">Live Streaming</li>
            <li className="hover:text-purple-500 hover:font-bold transition- transition-colors cursor-pointer">Course Builder</li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-6 border-l border-white/30 pl-8">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-purple-500 hover:font-bold transition-all duration-200 cursor-pointer">Documentation</li>
            <li className="hover:text-purple-500 hover:font-bold transition-all duration-200 cursor-pointer">Teaching Guide</li>
            <li className="hover:text-purple-500 hover:font-bold transition-all duration-200 cursor-pointer">API Reference</li>
            <li className="hover:text-purple-500 hover:font-bold transition-all duration-200 cursor-pointer">Progress API</li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-6 border-l border-white/30 pl-8">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Connect</h4>
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Twitter size={16} className="text-sky-500" /> Twitter
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Github size={16} /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Mail size={16} /> Newsletter
            </a>
          </div>
        </div>
      </div>

      {/* 2. CENTER SECTION: LARGE PIXEL BRANDING */}
      <div className="relative py-20 border-t border-white/30">
        <div className="flex flex-col items-center justify-center">
            {/* Using your Classes.io logo style in large format */}
            <div className="flex items-baseline gap-4 select-none opacity-80 hover:opacity-100 transition-opacity">
               <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white uppercase font-mono">
                 CLASSES
               </h1>
               <div className="w-12 h-12 md:w-24 md:h-24 bg-purple-600 rounded-[20%] rotate-12 shadow-[0_0_50px_rgba(147,51,234,0.3)] flex items-center justify-center">
                  <span className="text-white text-4xl md:text-7xl font-bold">io</span>
               </div>
            </div>
            
            <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-gray-600 font-medium">
              © {currentYear} CLASSES.IO — POWERED BY ELITE EDUCATORS
            </p>
        </div>
        
        {/* Subtle Background Glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[100px] bg-purple-900/20 blur-[100px] pointer-events-none" />
      </div>

    </footer>
  );
}