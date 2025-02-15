'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { InputBox } from '@/components/InputBox';
import { useRouter } from 'next/navigation';
import Bottomwarning from '@/components/Bottomwarning';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useToast } from '@/components/ui/use-toast';
import { signUpSchema } from '@/schema/signUpSchema';
import Image from 'next/image';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const navigate = (name: string) => {
    router.push(name);
  };

  async function SignUpHandler() {
    try {
      const validation = signUpSchema.safeParse({ username, email, password });

      if (!validation.success) {
        const errorMessage = validation.error.errors[0]?.message || "Invalid input";
        toast({ title: 'Error', description: errorMessage, variant: "destructive" });
        return;
      }

      if (!username || !email || !password) {
        toast({ title: 'Error', description: 'Please fill in all fields.', variant: "destructive" });
        return;
      }

      const response = await axios.post('/api/signup', { username, email, password });
      if (response.data.success) {
        toast({ title: 'Success', description: response.data.message });
        router.push('/login');
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.response.data.message, variant: "destructive" });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { redirect: true, callbackUrl: '/' });
    } catch (error) {
      toast({ title: 'Error occurred', description: 'Sign-in with Google failed. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen items-center justify-center'>
      <div className='hidden md:flex w-[60%] h-full relative left-2'>
        <Image src="https://tryshine.ai/wp-content/uploads/2024/04/signup.svg" alt="Signup" width={200} height={500} className="w-full h-full object-cover rounded-l-xl" />
      </div>
        <div className='bg-white rounded-xl p-8 flex flex-col items-center gap-6 w-full max-w-md shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800'>Sign Up</h2>
          <div className='flex flex-col gap-4 w-full'>
            <InputBox onChange={(e:any) => setUsername(e.target.value)} label={"Name"} placeholder={"Enter your name"} type={'text'} />
            <InputBox onChange={(e:any) => setEmail(e.target.value)} label={"Email"} placeholder={"Enter your email"} type={'text'}/>
            <div className="relative">
              <InputBox onChange={(e:any) => setPassword(e.target.value)} label={"Password"} placeholder={"Enter your password"} type={showPassword ? 'text' : 'password'} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-gray-500">
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
            </div>
          </div>
          <button onClick={SignUpHandler} className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-all duration-200">Sign Up</button>
          <button onClick={handleGoogleSignIn} className="w-full bg-white text-gray-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-200">
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <Bottomwarning label={"Already have an account?"} to={'/login'} buttontext={'Login'} />
        </div>
      </div>
  );
}
