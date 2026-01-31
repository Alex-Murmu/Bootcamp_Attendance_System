import { Button } from '@/components/ui/button'
import { FieldGroup, FieldTitle, FieldDescription } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { BookOpen, Sparkles, Target, Video } from 'lucide-react';

interface loginInfo {
  email: string,
  password: string
}
export default function Login() {
  const [loginData, setLoginData] = useState<loginInfo>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value })

  }
  const navigate = useNavigate();


  const handleSignin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:2000/auth/signin", loginData);
      if (response.data.success) {
        alert("login Successfully");
      }
    } catch (error: any) {
      alert(error.response?.data?.error ||"login Failed")
    }
    setLoading(false)
  }
  return (
    <div className='flex justify-center items-center  w-full h-screen bg-purple-600'>
      <div className='absolute top-4 left-4'><Button onClick={() => navigate(-1)}>Go Back</Button></div>
      <div className='flex'>
      
            <div className='relative hidden min-w-96 lg:flex flex-col justify-between w-1/2 p-16 overflow-hidden border-r rounded-l-2xl  border-white/10'>
                {/* Background Glow Effect */}
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-900/70 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

                {/* Top: Logo Section */}
                <div className='relative z-10 flex items-center gap-2'>
                    <div className='bg-indigo-600 p-1.5 rounded-lg'>
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <span className='font-bold tracking-widest text-xl uppercase text-white'>Classes.io</span>
                </div>

                {/* Middle: Value Proposition */}
                <div className='relative z-10 mt-20'>
                    <h1 className='text-5xl font-extrabold leading-tight tracking-tight text-white'>
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
        
<div className='flex flex-col justify-center items-center min-w-96 w-full lg:w-1/2 bg-black backdrop-blur-md p-8 rounded-r-2xl'>
                <div className='w-full max-w-md'>
                    <FieldGroup className='space-y-6'>
                        <div className='space-y-2 text-center'>
                            <h2 className='text-3xl font-bold tracking-tight text-white'>Signup</h2>
                            <p className='text-gray-400'>Please enter your information to gain access.</p>
                        </div>

                        <div className='space-y-4 text-white'>
                    

                            <div className='space-y-2'>
                                <Label htmlFor='email' className='text-sm font-medium'>Email</Label>
                                <Input className='bg-zinc-900 border-zinc-800' type="email" id='email' name='email' value={loginData.email} onChange={handleInput} placeholder="name@example.com" />
                            </div>


                            <div className='space-y-2'>
                                <Label htmlFor='password' className='text-sm font-medium'>Password</Label>
                                <Input className='bg-zinc-900 border-zinc-800' type='password' id='password' name='password' value={loginData.password} onChange={handleInput} />
                            </div>

                            <Button 
                                onClick={handleSignin} 
                                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl transition-all'
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Register"}
                            </Button>
                        </div>

                        <p className='text-center text-sm text-gray-500'>
                            Already have an account?{' '}
                            <Link className='text-indigo-400 hover:underline' to={"/signup"}>signup</Link>
                        </p>
                    </FieldGroup>
                </div>
            </div>
      </div>
    </div>
  )
}
