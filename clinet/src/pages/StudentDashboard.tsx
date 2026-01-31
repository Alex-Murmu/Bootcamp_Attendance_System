import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Users, Settings, 
  History, Star, ChevronRight, Bell, Search,
  GraduationCap, LogOut, Sparkles,
  Type
} from 'lucide-react';

export default function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#020202] text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR (Matching image_e923d9.png) */}
      <aside className={`relative flex flex-col border-r border-white/5 bg-[#050505] transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        
        {/* Top: Brand Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="bg-purple-600 p-1.5 rounded-lg shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            <Sparkles size={18} />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tighter text-lg uppercase italic">Classes.io</span>}
        </div>

        {/* Middle: Navigation Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Platform</p>
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isOpen={isSidebarOpen} />
            <NavItem icon={<BookOpen size={20} />} active label="My Classes" isOpen={isSidebarOpen} />
            <NavItem icon={<Users size={20} />} active label="Community" isOpen={isSidebarOpen} />
          </div>

          <div className="space-y-1">
            <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Resources</p>
            <NavItem icon={<History size={20} />} active label="History" isOpen={isSidebarOpen} />
            <NavItem icon={<Star size={20} />} active label="Starred" isOpen={isSidebarOpen} />
            <NavItem icon={<Settings size={20} />} active label="Settings" isOpen={isSidebarOpen} />
          </div>
        </nav>

        {/* Bottom: User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=shadcn" className="w-9 h-9 rounded-full bg-zinc-800" alt="avatar" />
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">shadcn</p>
                <p className="text-[10px] text-gray-500 truncate">m@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020202] relative">
        
        {/* Background Glows (Signature Winterfell look) */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 relative z-10 backdrop-blur-md bg-black/20">
          <div className="flex items-center gap-4 text-gray-400">
             <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <div className="w-5 h-0.5 bg-current mb-1" />
                <div className="w-5 h-0.5 bg-current" />
             </button>
             <span className="text-sm font-medium">Dashboard / Overview</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
               <input className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 w-64" placeholder="Search..." />
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 relative">
                <Bell size={20} />
                <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-black" />
            </button>
          </div>
        </header>

        {/* 3. BENTO GRID CONTENT (Matching image_e923d9.png) */}
        <div className="flex-1 p-8 overflow-y-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[160px]">
            
            {/* Top Row Cards */}
            <BentoCard className="md:col-span-1" title="Active Students" value="1,284" icon={<Users className="text-purple-500" />} />
            <BentoCard className="md:col-span-1" title="Course Progress" value="78.4%" icon={<GraduationCap className="text-blue-500" />} />
            <BentoCard className="md:col-span-1" title="Global Rank" value="#42" icon={<Star className="text-yellow-500" />} />

            {/* Large Bottom Content Area */}
            <div className="md:col-span-3 md:row-span-3 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
               {/* Place your Chart or Class Table Here */}
               <div className="text-center">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <History size={32} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No recent activity detected</h3>
                  <p className="text-gray-600 text-sm mt-2">Start a class to see detailed analytics here.</p>
               </div>
               
               {/* Background Grid Pattern */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


interface navItem {
  icon:React.ReactElement,
  label:string,
  active:boolean,
  isOpen:boolean
}


// Helper Components
function NavItem({ icon, label, active = false, isOpen = true }:navItem) {
  
  return (
    <div className={`
      flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
      ${!isOpen && 'justify-center'}
    `}>
      <span className="shrink-0">{icon}</span>
      {isOpen && <span className="text-sm font-bold tracking-tight">{label}</span>}
      {active && isOpen && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </div>
  );
}
interface bentoCard {
  title:string,
  value:string,
  icon:React.ReactElement,
  className:string
}



function BentoCard({ title, value, icon, className }:bentoCard) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between group overflow-hidden relative ${className}`}
    >
      <div className="absolute right-4 top-4 opacity-10 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { size: 200 })}
      </div>
      <div className="flex justify-start gap-2 items-center">
        <div className="bg-white/5 p-2 rounded-lg">{React.cloneElement(icon as React.ReactElement, { size: 20 })}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{title}</span>
      </div>
      <div className="text-4xl font-black tracking-tighter">{value}</div>
    </motion.div>
  );
}

