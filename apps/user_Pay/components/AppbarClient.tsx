"use client";
import { Appbar } from '@repo/ui/Appbar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';



export const AppbarClient = () => {
    const session= useSession();
    const router= useRouter();
  return (
    <div >
        <Appbar onSignin={signIn} onSignout={
            async ()=>{
                await signOut({redirect: false});
                router.push("/api/auth/signin")
                toast.success("Logged out successfully");
            }
        } user={session.data?.user} />
    </div>
  )
}