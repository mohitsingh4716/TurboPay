import React, { useState } from "react";
import { Input } from "@repo/ui/input";
import { Heading } from "@repo/ui/heading";
import { SigninInputTypes } from "@repo/validation/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { Button } from "./ui/button";


export const Signinform: React.FC = () => {
  const [signindata, setSignindata] = useState<SigninInputTypes>({
    phone:'',
    password:'',
  })
  const [rememberMe, setRememberMe] = useState(false);

  const router=useRouter();

 async function handleSignIn() {
    // console.log({ signindata, rememberMe });
    if(signindata.phone.trim().length < 1 || signindata.password.trim().length < 1){
      toast.warning("Please fill all fields");
      return;
    }

    const loadingToast= toast.loading("Signing in...");

    try{
      const res= await signIn("credentials", {
        phone: signindata.phone,
        password: signindata.password,
        rememberMe,
        redirect: false,
       
      })
      if(res?.error){
        toast.dismiss(loadingToast);
        toast.error(res.error);
        return;
      }
      setSignindata({phone:'', password:''});
      toast.dismiss(loadingToast);
      toast.success("Signin successful");
      router.push("/");
    }
    catch(err:any){
      toast.dismiss(loadingToast);
      if (err.response.data.error) {
        toast.warning(err.response.data.error);
      } else {
        console.error("An error occurred:", err);
        toast.error("An error occurred. Please try again later");
      }
    }
    
  };

  return (
    <Card className="w-full max-w-md p-10 mx-auto">
    <div className="w-full max-w-md">
      <Heading label="Sign in your account" />
      <p className="text-gray-500 mb-6">
        Log in to continue with your payments
      </p>

      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={signindata.phone}
        onChange={(e) =>setSignindata({...signindata, phone:e.target.value})}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={signindata.password}
        onChange={(e) => setSignindata({...signindata,password:e.target.value})}
      />

      <div className="flex items-center text-sm justify-between my-2">

        <div className="text-sm cursor-pointer hover:text-gray-800 gradient-title hover:underline">
          Forgot Password?
        </div>
      </div>

      <div className="pt-4 flex justify-center ">
                 <Button className="w-full gradient " onClick={handleSignIn}>Sign in</Button>
       </div>

       <div className="pt-4 flex justify-center">
         <p>Don't have an account? </p>
         <span>
            <a href="/signup" className="gradient-title hover:underline">Sign up</a>
         </span>
       </div>
     
    </div>
    </Card>
  );
};
