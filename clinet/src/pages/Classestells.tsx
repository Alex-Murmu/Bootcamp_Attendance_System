import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Piyush Raj",
    date: "36 days ago",
    content: "Goated UI and seamless experience. The live classes are game-changing.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piyush",
    stars: 5
  },
  {
    name: "Vinay",
    date: "8 days ago",
    content: "Excellent work on the progress reports. Finally, a platform that actually tracks my growth.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinay",
    stars: 5
  },
  {
    name: "Abhi Mittal",
    date: "2 days ago",
    content: "The focus mode is exactly what I needed to finish my assignments.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhi",
    stars: 5
  },
  {
    name: "Ayaan Shilledar",
    date: "15 days ago",
    content: "Crazyyy UI. Best educational platform I've used in 2026.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayaan",
    stars: 5
  },
  {
    name: "Prince Kumar",
    date: "6 days ago",
    content: "Great man... the teacher tools are so intuitive.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prince",
    stars: 5
  }
];

export default function WinterTales() {
  return (
    <section className="bg-[#020202] py-24 px-8 relative overflow-hidden">
         <div className="absolute inset-0 opacity-[0.55]" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 2px)`, backgroundSize: '30px 30px' }} 
      />
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 50 }}
            className="text-7xl md:text-8xl font-black tracking-tighter text-white leading-none"
          >
            Classes.io tales
          </motion.h2>
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.0 }}
            className="text-6xl md:text-7xl font-light tracking-tighter text-white/90 mt-2 ml-auto text-right md:text-left md:ml-40"
          >
            from the Wall
          </motion.h2>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all group relative overflow-hidden"
            >
              {/* Purple Glow on Hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[60px] group-hover:bg-purple-600/20 transition-all" />

              <Quote className="text-purple-500 mb-4" size={32} fill="currentColor" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(item.stars)].map((_, s) => (
                  <Star key={s} size={14} className="fill-purple-500 text-purple-500" />
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {item.content}
              </p>

              <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-full bg-zinc-800"
                  />
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-gray-500 text-xs">{item.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}