import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Video, Mic, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const SOCKET_URL = "http://localhost:2000";

export default function LiveClass() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const socketRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.emit("join_class", id);

        socketRef.current.on("receive_message", (data: any) => {
            setMessages((prev) => [...prev, data]);
        });

        socketRef.current.on("class_live_ended", () => {
            alert("Live class has ended.");
            navigate(-1);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id, navigate]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim()) {
            const msgData = {
                classId: id,
                user: user?.name || "Anonymous",
                text: input,
                time: new Date().toLocaleTimeString(),
            };

            socketRef.current.emit("send_message", msgData);
            setMessages((prev) => [...prev, msgData]);
            setInput("");
        }
    };

    const endClass = () => {
        socketRef.current.emit("end_live", { classId: id });
        navigate(-1);
    };

    return (
        <div className="flex h-screen bg-[#050505] text-white">
            {/* LEFT: Video Area */}
            <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
                        <ArrowLeft size={20} />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-bold tracking-wide uppercase text-sm">Live Now</span>
                    </div>
                    {user?.role === 'teacher' && (
                        <Button onClick={endClass} variant="destructive" className="ml-auto">
                            End Class
                        </Button>
                    )}
                </div>

                <div className="flex-1 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                        <h2 className="text-2xl font-bold">Advanced React Patterns</h2>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Users size={16} /> 24 Students
                            </div>
                        </div>
                    </div>
                    <Video size={64} className="text-gray-700 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>

            {/* RIGHT: Chat Area */}
            <div className="w-96 bg-zinc-900/50 border-l border-white/5 flex flex-col">
                <div className="p-4 border-b border-white/5 font-bold">Live Chat</div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.user === user?.name ? 'items-end' : 'items-start'}`}>
                            <div className={`px-4 py-2 rounded-xl text-sm max-w-[80%] ${msg.user === user?.name ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-200'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-gray-500 mt-1">{msg.user} • {msg.time}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-white/5 flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="bg-black/50 border-white/10"
                    />
                    <Button onClick={sendMessage} size="icon" className="bg-purple-600 hover:bg-purple-700">
                        <Send size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
