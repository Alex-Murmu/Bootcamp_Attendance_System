import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, ChevronRight, Sparkles,
  History, Star, GraduationCap
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '@/store/store';
import { fetchMyClasses } from '@/store/slices/classSlice';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { classes, isLoading } = useSelector((state: RootState) => state.class);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)
  useEffect(() => {
    dispatch(fetchMyClasses());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-[#020202] text-white selection:bg-purple-500/30 overflow-hidden font-sans">

      {/* 1. SIDEBAR */}
      <aside className={`relative flex flex-col border-r border-white/5 bg-[#050505] transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>

        {/* Top: Brand Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="bg-purple-600 p-1.5 rounded-lg shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            <Sparkles size={18} />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tighter text-lg uppercase italic">Classes.io</span>}
        </div>

        {/* Middle: Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Platform</p>
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isOpen={isSidebarOpen} />
            <NavItem icon={<BookOpen size={20} />} active label="My Classes" isOpen={isSidebarOpen} />
          </div>
        </nav>

        {/* Bottom: User Profile */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=shadcn" className="w-9 h-9 rounded-full bg-zinc-800" alt="avatar" />
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.name || "Student"}</p>
                <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#020202] relative">

        {/* Background Glows */}
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
            {/* Header Content */}
          </div>
        </header>

        {/* 3. BENTO GRID CONTENT */}
        <div className="flex-1 p-8 overflow-y-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[160px]">

            {/* Top Row Cards */}
            <BentoCard className="md:col-span-1" title="Enrolled Classes" value={classes.length.toString()} icon={<BookOpen className="text-purple-500" />} />
            <BentoCard className="md:col-span-1" title="Attendance Rate" value="92%" icon={<GraduationCap className="text-blue-500" />} />
            <BentoCard className="md:col-span-1" title="Streak" value="12 Days" icon={<Star className="text-yellow-500" />} />

            {/* My Classes Grid */}
            <div className="md:col-span-3 md:row-span-3 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-6">My Classes</h3>

              {isLoading ? (
                <div className="text-gray-500">Loading your classes...</div>
              ) : classes.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <History size={32} className="text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">No classes yet</h3>
                  <p className="text-gray-600 text-sm mt-2">Enrolled classes will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[400px]">
                  {classes.map((cls: any) => (
                    <motion.div
                      key={cls._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-black/40 border border-white/10 p-6 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-colors"
                      onClick={() => navigate(`/class/${cls._id}`)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-900/20 p-3 rounded-lg text-purple-400">
                          <BookOpen size={24} />
                        </div>
                        <span className="text-xs uppercase bg-white/5 px-2 py-1 rounded text-gray-400">Active</span>
                      </div>
                      <h4 className="text-xl font-bold mb-1">{cls.className}</h4>
                      <p className="text-sm text-gray-500">
                        Instructor: {cls.teacherId?.name || "Unknown"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reuse helper components
function NavItem({ icon, label, active = false, isOpen = true }: any) {
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

function BentoCard({ title, value, icon, className }: any) {
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
;
};

