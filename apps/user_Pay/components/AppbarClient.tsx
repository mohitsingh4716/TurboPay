"use client";
import { Appbar } from '@repo/ui/Appbar'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { Card } from './ui/card';
import Image from 'next/image';



export const AppbarClient = () => {
    const session= useSession();
    const router= useRouter();
  return (
    <div className='fixed w-full bg-slate-50 z-50' >
        <Appbar onSignin={signIn} onSignout={
            async ()=>{
                await signOut({redirect: false});
                // router.push("/api/auth/signin")
                router.push('/landing')
                toast.success("Logged out successfully");
            }
        } user={session.data?.user} />
    </div>

  )
}

export const Header= async ()=>{
  return (
   <div>
      <Card>
        <div>
        <Image  src="/images/logo.png"
          alt="TurboPay Logo"
          width={200} height={60}
          priority/>
        </div>
      </Card>
   </div>
  )
}