"use client";

import { ArrowRight, Shield, ArrowUpRight, Wallet, SparklesIcon, CreditCard, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";


const features = [
  {
    name: "100% Secured",
    description: "We take proactive steps to ensure your transactions and data are secure.",
    icon: Shield,
  },
  {
    name: "Balance Transfer",
    description: "Transfer money instantly to any wallet with zero fees.",
    icon: ArrowUpRight,
  },
  {
    name: "Smart Wallet",
    description: "Manage all your payments and transactions in one place.",
    icon: Wallet,
  },
];

export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Sign up quickly with our secure and easy registration process.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "2. Add Money to Wallet",
    description:
      "Transfer funds from your bank to your wallet and use them to send money to anyone effortlessly.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "3. Track Your Transactions",
    description:
      "Monitor and categorize your transactions in real-time for better financial management.",
  },
];



export const LandingPage = () => {
  const imgRef = useRef<HTMLDivElement | null>(null);

  const router= useRouter();

  useEffect(() => {
    const imageElement = imgRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  async function handleTest(){
    const loadingToastId = toast.loading("Signing in as Test User");
    try{
        const res = await signIn('credentials', {
            phone: '1234567890',
            password: 'Test@123',
            redirect: false
        })

        toast.dismiss(loadingToastId);


        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Signed in Test User");
            router.push('/dashboard');
        }
    } catch (err) {
        console.log("Signup error ", err);
        toast.dismiss(loadingToastId);
        toast.error("An error occurred during signin. Please try again");
    }


}


  return (
    <main className="overflow-x-hidden" >
     
      <div className="overflow-hidden bg-white pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex rounded-full px-3 py-1 mt-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <SparklesIcon className="text-blue-600 mr-[10px] h-5 w-5" />
                Think better, pay secure{" "}
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              The Next Generation{" "}
              <span className="gradient-title bg-clip-text text-transparent">
                Payment Wallet
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience seamless transactions with TurboPay. Send, receive, and manage your money with
              unmatched speed and security.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">

              <Button onClick={()=>router.push("/signup")} size="lg" className="gradient">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button onClick={handleTest} variant="outline" size="lg" className=" border border-blue-600 gradient-title ">
                Try now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -ml-24 h-[400px] w-[800px] bg-gradient-to-r from-blue-50 to-blue-100 blur-3xl max-w-full" />
              <div className="">
                <div className="flex justify-center">
                  <div className="">
                    <div className='hero-image-wrapper'>
                      <div ref={imgRef} className='hero-image'>
                        <Image
                          src="/images/turbomain.png"
                          priority
                          width={1100}
                          height={700}
                          alt='Dashboard preview'
                          className='rounded-lg shadow-2xl border mx-auto'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-center text-3xl font-bold "> Everything you need to manage your wallet</h2>
        
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
               {
            features.map((feature, index)=>(
              <Card key={index} className="p-6  pt-4"> 
                  <CardContent className=" space-y-4">
                   <feature.icon className="h-12 w-12 text-blue-600  mb-6 animate-[float_6s_ease-in-out_infinite]"/>
                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                 
              </Card>
            ))
          }
            </div>
          </div>
        </div>
      </div>
      

      <div className="py-20 bg-blue-50  dark:bg-white/55">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold dark:text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {
            howItWorksData.map((data, index)=>(
              <div key={index} className="p-6 space-y-4 text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                {data.icon}
                </div>
                <h3 className="text-xl  font-semibold dark:text-black">{data.title}</h3>
                <p className="text-gray-600">{data.description}</p>
              </div>
            ))
          }

        </div>
      </div>
     </div>

     <div className="py-16 bg-white">

     </div>

      <div className="py-16  bg-gradient-to-r from-blue-500 to-blue-400">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-center text-3xl font-bold mb-4">Ready to Take Control of Your Wallet?</h1>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join our users who are already managing their wallet smarter with Turbopay</p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
       </div>


       <footer className=" py-8 border-t-2">
           <div className="container mx-auto px-4 text-center text-gray-600 flex justify-evenly ">
            <p>© 2025 Turbopay. All rights reserved.</p>
           </div>
        </footer>

    </main>
  );
};
