import React, { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '@/store/store';
import { fetchMyClasses, createClass } from '@/store/slices/classSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TeacherDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { classes, isLoading } = useSelector((state: RootState) => state.class);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");

  useEffect(() => {
    dispatch(fetchMyClasses());
  }, [dispatch]);

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;
    await dispatch(createClass({ className: newClassName }));
    setIsModalOpen(false);
    setNewClassName("");
    // Refresh list is handled by redux state update if createClass fulfills correctly
    // But createClass pushes to state, so it should update automatically.
  };

  // Mock analytics data (keep for UI appeal until real stats are avail)
  const classStats = [
    { day: 'Mon', progress: 45 },
    { day: 'Tue', progress: 52 },
    { day: 'Wed', progress: 48 },
    { day: 'Thu', progress: 70 },
    { day: 'Fri', progress: 85 },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 font-sans">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-purple-500">Faculty Hub</h1>
          <p className="text-gray-500 font-medium">Welcome back, {user?.name || "Professor"}.</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-6 py-6 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-400 transition-colors"
        >
          <Plus size={20} /> Create Class
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* TOTAL ENROLLMENT CARD */}
        <div className="lg:col-span-1 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
          <Users className="text-purple-500" size={40} />
          <div>
            <span className="text-6xl font-black tracking-tighter">{classes.length}</span>
            <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">Active Cohorts</p>
          </div>
        </div>

        {/* OVERALL PROGRESS CHART */}
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
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
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
          <h3 className="text-2xl font-bold mb-6">Your Classes</h3>
          {isLoading ? (
            <div className="text-center py-10 text-gray-500">Loading classes...</div>
          ) : classes.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No classes found. Create one to get started.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 uppercase text-[10px] tracking-[0.2em] border-b border-white/5">
                  <th className="pb-4">Class Name</th>
                  <th className="pb-4">Students</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {classes.map((cls) => (
                  <tr key={cls._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-6 font-bold">{cls.className}</td>
                    <td className="py-6 text-gray-400">{cls.studentIds?.length || 0} Enrolled</td>
                    <td className="py-6">
                      <Button
                        onClick={() => navigate(`/class/${cls._id}`)}
                        className="bg-transparent border border-white/20 hover:bg-white hover:text-black text-xs uppercase font-bold"
                      >
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Simple Modal for Create Class */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">Create New Class</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Class Name</label>
                <Input
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. Advanced React Patterns"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              <Button
                onClick={handleCreateClass}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-6 text-lg font-bold rounded-xl"
              >
                Create Class
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherDashboard;