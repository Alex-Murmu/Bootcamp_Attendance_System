import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, GraduationCap, Plus } from 'lucide-react';

const TeacherDashboard = () => {
  // Mock analytics data
  const classStats = [
    { day: 'Mon', progress: 45 },
    { day: 'Tue', progress: 52 },
    { day: 'Wed', progress: 48 },
    { day: 'Thu', progress: 70 },
    { day: 'Fri', progress: 85 },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-8">
      <div className="flex justify-between items-end mb-12">
        <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic text-purple-500">Faculty Hub</h1>
            <p className="text-gray-500 font-medium">Manage your cohorts and track global performance.</p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-400 transition-colors">
            <Plus size={20} /> Create Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* TOTAL ENROLLMENT CARD */}
        <div className="lg:col-span-1 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
            <Users className="text-purple-500" size={40} />
            <div>
                <span className="text-6xl font-black tracking-tighter">1,284</span>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">Active Students</p>
            </div>
        </div>

        {/* OVERALL PROGRESS CHART (WINTERFELL STYLE) */}
        <div className="lg:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tight">Batch Performance Velocity</h3>
            <div className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full uppercase font-bold">Live Data</div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classStats}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="day" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    itemStyle={{ color: '#9333ea' }}
                />
                <Area type="monotone" dataKey="progress" stroke="#9333ea" strokeWidth={4} fillOpacity={1} fill="url(#colorProgress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CLASS LIST TABLE */}
        <div className="lg:col-span-4 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 uppercase text-[10px] tracking-[0.2em] border-b border-white/5">
                        <th className="pb-4">Class Name</th>
                        <th className="pb-4">Students</th>
                        <th className="pb-4">Avg. Score</th>
                        <th className="pb-4">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="py-6 font-bold">Solana Smart Contracts</td>
                        <td className="py-6 text-gray-400">420 Enrolled</td>
                        <td className="py-6">
                            <span className="text-emerald-400 font-mono">88.4%</span>
                        </td>
                        <td className="py-6">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold">Ongoing</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;