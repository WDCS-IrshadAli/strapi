"use client";

import { authenticate, githubLogin, googleLogin } from '@/app/lib/actions'
import UseFormStatusBtn from '@/app/ui/UseFormStatusBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useFormState } from 'react-dom';
import { Toaster, toast } from 'sonner';

const Login = () => {

    const router  = useRouter();
    const initialState: any = { message: null, error: null, success: null };
    const [state, dispatch] = useFormState(authenticate, initialState);

    // error handling 
    console.log("aa", state);
    if (state.success === false) {
        toast.error(state.error);
        state.success = null;
        state.error = null;
    } 
    // else if (state.success === true) {
    //     toast.success(state.message);
    //     state.success = null;
    //     state.message = null;
    //     setTimeout(() => {
    //     router.push("/admin/dashboard")
    //     }, 1000)
    // }
  return (
    <>
        <div className="bg-background dark text-primary flex flex-col justify-center items-center h-screen">
          <Toaster position="top-right" theme="dark" richColors />
            <h1 className="text-2xl px-3 sm:px-6 mb-4">Login Form</h1>

            <div className="w-full px-3 sm:px-6 flex justify-center flex-col items-center">
                <div className="flex gap-3 mb-4">
                    <form action={githubLogin}>
                        <Button type="submit">Github</Button>
                    </form>
                    <form action={googleLogin}>
                        <Button type="submit">Google</Button>
                    </form>
                </div>
                <form action={dispatch} className="flex flex-col gap-3">
                    <div className="grid w-full max-w-sm items-center gap-2">
                        <Label htmlFor="username" className="text-xs">Username</Label>
                        <Input defaultValue="kate_h" type="text" id="username" placeholder="Username" name="username" className="font-normal" />
                        <span className="text-xs font-normal text-gray-300">This is your public display username.</span>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-2">
                        <Label htmlFor="password" className="text-xs">Password</Label>
                        <Input defaultValue="kfejk@*_" type="password" id="password" name="password" placeholder="Password" className="font-normal" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-2">
                        <UseFormStatusBtn>Submit</UseFormStatusBtn>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login