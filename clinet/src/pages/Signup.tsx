import { Button } from '@/components/ui/button';
import { FieldDescription, FieldGroup, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// Using Lucide-react for the bottom icons to match the reference image style
import { Sparkles, BookOpen, Target, Video } from 'lucide-react';

interface userProfile {
    name: string,
    email: string,
    role: string,
    password: string,
}

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userProfile>({ name: "", email: "", role: "student", password: "" });

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response: any = await axios.post("http://localhost:2000/auth/signup", user);
            alert("Account Created: " + response.data.data.name);
            navigate("/login")
        } catch (error: any) {
            alert(error.response?.data?.error || "Signup failed")
        }
        setLoading(false)
    }

    return (
        // Main container: Split screen
        <div className='flex min-h-screen bg-purple-600 text-white font-sans'>
                  <div className='absolute top-4 left-4'><Button onClick={() => navigate(-1)}>Go Back</Button></div>
            
            <div className='flex m-auto rounded-lg'>
            {/* --- LEFT DIV: THE DESIGN PANEL --- */}
            <div className='relative hidden min-w-96 lg:flex flex-col justify-between w-1/2 p-16 overflow-hidden border-r rounded-l-2xl  border-white/10'>
                {/* Background Glow Effect */}
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-900/70 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

                {/* Top: Logo Section */}
                <div className='relative z-10 flex items-center gap-2'>
                    <div className='bg-indigo-600 p-1.5 rounded-lg'>
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <span className='font-bold tracking-widest text-xl uppercase'>Classes.io</span>
                </div>

                {/* Middle: Value Proposition */}
                <div className='relative z-10 mt-20'>
                    <h1 className='text-5xl font-extrabold leading-tight tracking-tight'>
                        Where Classes <br />
                        Meet Focus.
                    </h1>
                    <p className='mt-6 text-gray-400 text-lg max-w-md leading-relaxed'>
                        Access premium live classes, a noise-free study environment, 
                        and curated assignments. Built for students who actually 
                        want to master their craft.
                    </p>
                </div>

                {/* Bottom: Feature Icons */}
                <div className='relative z-10 flex gap-4'>
                    <div className='p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm'>
                        <Video size={24} className="text-indigo-400" />
                    </div>
                    <div className='p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm'>
                        <Target size={24} className="text-purple-400" />
                    </div>
                    <div className='p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm'>
                        <BookOpen size={24} className="text-emerald-400" />
                    </div>
                </div>
            </div>

            {/* --- RIGHT DIV: THE FORM PANEL (Layout kept as per your request) --- */}
            <div className='flex flex-col justify-center items-center min-w-96 w-full lg:w-1/2 bg-black backdrop-blur-md p-8 rounded-r-2xl'>
                <div className='w-full max-w-md'>
                    <FieldGroup className='space-y-6'>
                        <div className='space-y-2 text-center'>
                            <h2 className='text-3xl font-bold tracking-tight'>Signup</h2>
                            <p className='text-gray-400'>Please enter your information to gain access.</p>
                        </div>

                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='name' className='text-sm font-medium'>Name</Label>
                                <Input className='bg-zinc-900 border-zinc-800 focus:ring-indigo-500' type='text' id='name' name='name' value={user.name} onChange={handleInput} placeholder="John Doe" />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='email' className='text-sm font-medium'>Email</Label>
                                <Input className='bg-zinc-900 border-zinc-800' type="email" id='email' name='email' value={user.email} onChange={handleInput} placeholder="name@example.com" />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='role' className='text-sm font-medium'>Role</Label>
                                <Input className='bg-zinc-900 border-zinc-800' type='text' id='role' name='role' value={user.role} onChange={handleInput} />
                            </div>

                            <div className='space-y-2'>
                                <Label htmlFor='password' className='text-sm font-medium'>Password</Label>
                                <Input className='bg-zinc-900 border-zinc-800' type='password' id='password' name='password' value={user.password} onChange={handleInput} />
                            </div>

                            <Button 
                                onClick={handleSignup} 
                                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl transition-all'
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </Button>
                        </div>

                        <p className='text-center text-sm text-gray-500'>
                            Already have an account?{' '}
                            <Link className='text-indigo-400 hover:underline' to={"/login"}>Login</Link>
                        </p>
                    </FieldGroup>
                </div>
            </div>
            </div>
        </div>
    )
}