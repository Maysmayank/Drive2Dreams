'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { InputBox } from '@/components/InputBox';
import { useRouter } from 'next/navigation';
import Bottomwarning from '@/components/Bottomwarning';
import { signIn } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from '@/schema/loginschema';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Login() {
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // New state for password visibility
  const router = useRouter();
  const { toast } = useToast();

  const navigate = (name: string) => {
    router.push(name);
  };

  async function LoginHandler() {
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || "Invalid input";
      toast({
        title: 'Error',
        description: errorMessage,
        variant: "destructive"
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: email,
        password
      });

      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: "destructive"
        });
      } else if (result?.ok) {
        // Redirect to home or dashboard
        router.replace('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        variant: "destructive"
      });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { redirect: true, callbackUrl: '/' });
    } catch (error) {
      toast({
        title: 'Error occurred',
        description: 'Sign-in with Google failed. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen items-center justify-center'>
      {/* Left Side - Image (Hidden on Mobile) */}
      <div className='hidden md:flex w-[40%] h-full'>
        <img src="/login-banner.jpg" alt="Login" className="w-full h-full object-cover rounded-l-xl" />
      </div>

      {/* Right Side - Login Form */}
      <div className='w-full md:w-[60%] flex justify-center'>
        <div className='bg-white rounded-xl p-8 flex flex-col items-center gap-6 w-full max-w-md shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800'>Login</h2>

          <div className='flex flex-col gap-4 w-full'>
            <InputBox onChange={(e: any) => SetEmail(e.target.value)} label={"Email"} placeholder={"Enter your email"} type={"text"} />
            
            <div className='relative'>
              <InputBox 
                onChange={(e: any) => SetPassword(e.target.value)} 
                label={"Password"} 
                placeholder={"Enter your password"} 
                type={showPassword ? "text" : "password"} // Toggle between text and password input type
              />
              
              <div 
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
              >
                {showPassword ? <HiEyeOff className='text-gray-500' /> : <HiEye className='text-gray-500' />}
              </div>
            </div>
          </div>

          <button onClick={LoginHandler} className='bg-yellow-500 text-white font-semibold rounded-lg py-2 w-full hover:bg-yellow-600 transition'>Login</button>

          <button onClick={handleGoogleSignIn} className='bg-blue-600 text-white font-semibold rounded-lg py-2 w-full hover:bg-blue-700 transition'>Sign in with Google</button>

          <Bottomwarning label={"Don't have an account?"} to={'/signup'} buttontext={'Sign Up'} />
        </div>
      </div>
    </div>
  );
}
