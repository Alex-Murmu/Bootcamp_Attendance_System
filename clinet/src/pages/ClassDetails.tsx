import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '@/store/store';
import { fetchClassDetails, markAttendance, fetchMyAttendance } from '@/store/slices/classSlice';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X, User, Video, Radio } from 'lucide-react';
import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:2000";

export default function ClassDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { activeClass, isLoading, error } = useSelector((state: RootState) => state.class);
    const { user } = useSelector((state: RootState) => state.auth);

    // Local state for student's view of attendance
    const [myAttendance, setMyAttendance] = useState<any>(null);
    const [isLive, setIsLive] = useState(false);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchClassDetails(id));
            if (user?.role === 'student') {
                dispatch(fetchMyAttendance(id)).then((action) => {
                    if (fetchMyAttendance.fulfilled.match(action)) {
                        setMyAttendance(action.payload);
                    }
                });
            }

            // Connect to socket to listen for live status updates
            const newSocket = io(SOCKET_URL);
            newSocket.emit("join_class", id);
            newSocket.on("class_live_started", () => setIsLive(true));
            newSocket.on("class_live_ended", () => setIsLive(false));
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            }
        }
    }, [id, dispatch, user?.role]);

    useEffect(() => {
        if (activeClass) {
            setIsLive(activeClass.isLive || false);
        }
    }, [activeClass]);

    const handleMarkAttendance = async (studentId: string, status: 'Present' | 'Absent') => {
        if (!id) return;
        await dispatch(markAttendance({ classId: id, studentId, status }));
        alert(`Marked ${status}`);
    };

    const startClass = () => {
        if (socket) socket.emit("start_live", { classId: id });
        navigate(`/live/${id}`);
    };

    const joinClass = () => {
        navigate(`/live/${id}`);
    };

    if (isLoading) return <div className="p-8 text-white">Loading class details...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
    if (!activeClass) return <div className="p-8 text-white">Class not found</div>;

    return (
        <div className="min-h-screen bg-[#020202] text-white p-8 font-sans">
            <Button
                onClick={() => navigate(-1)}
                className="mb-8 bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2"
            >
                <ArrowLeft size={16} /> Back
            </Button>

            <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter mb-2">{activeClass.className}</h1>
                        <p className="text-gray-400">Instructor: <span className="text-purple-400 font-bold">{activeClass.teacher_name}</span></p>
                        <div className="mt-4 flex items-center gap-2">
                            {isLive ? (
                                <div className="flex items-center gap-2 text-red-500 font-bold animate-pulse">
                                    <Radio size={20} /> LIVE NOW
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm">Class is offline</div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-end">
                        <div className="bg-purple-900/20 px-4 py-2 rounded-xl border border-purple-500/20 text-purple-400 font-bold text-sm uppercase tracking-wider">
                            {user?.role} View
                        </div>
                        {user?.role === 'teacher' ? (
                            <Button
                                onClick={startClass}
                                className={`${isLive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold px-6 py-6 rounded-xl flex items-center gap-2`}
                            >
                                <Video size={24} /> {isLive ? "Resume Class" : "Go Live"}
                            </Button>
                        ) : (
                            <Button
                                onClick={joinClass}
                                disabled={!isLive}
                                className={`font-bold px-6 py-6 rounded-xl flex items-center gap-2 transition-all ${isLive ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]' : 'bg-zinc-800 text-gray-500 cursor-not-allowed'}`}
                            >
                                <Video size={24} /> Join Class
                            </Button>
                        )}
                    </div>
                </div>

                {user?.role === 'teacher' ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <User className="text-gray-400" />
                            Student Roster
                        </h2>

                        {activeClass.students && activeClass.students.length > 0 ? (
                            <div className="space-y-4">
                                {activeClass.students.map((student: any) => (
                                    <div key={student._id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold">
                                                {student.name ? student.name.charAt(0) : "S"}
                                            </div>
                                            <span className="font-medium">{student.name || "Student"}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleMarkAttendance(student._id, "Present")}
                                                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/50"
                                                size="sm"
                                            >
                                                <Check size={16} className="mr-1" /> Present
                                            </Button>
                                            <Button
                                                onClick={() => handleMarkAttendance(student._id, "Absent")}
                                                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50"
                                                size="sm"
                                            >
                                                <X size={16} className="mr-1" /> Absent
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 italic">No students enrolled yet.</div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Your Attendance</h2>
                        <div className="bg-black/40 p-8 rounded-2xl border border-white/5 text-center">
                            {myAttendance ? (
                                <div>
                                    <p className="text-gray-400 mb-2">Status for Today</p>
                                    <div className={`text-5xl font-black tracking-tighter ${myAttendance.status === 'Present' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {myAttendance.status}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-4">Last updated: {new Date(myAttendance.date).toLocaleDateString()}</p>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    No attendance record found for this class today.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
