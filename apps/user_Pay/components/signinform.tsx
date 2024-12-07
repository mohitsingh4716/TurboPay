import React, { useState } from "react";
import { Input } from "@repo/ui/input";
import { CheckBoxComp } from "@repo/ui/checkbox";
import { Button } from "@repo/ui/authbutton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subheading";
import { SignInInputType } from "@repo/validation/inputValidation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export const Signinform: React.FC = () => {
  const [signindata, setSignindata] = useState<SignInInputType>({
    phone:'',
    password:'',
  })
  const [rememberMe, setRememberMe] = useState(false);

  const router=useRouter();

 async function handleSignIn() {
    console.log({ signindata, rememberMe });
    if(signindata.phone.trim().length < 1 || signindata.password.trim().length < 1){
      toast.warning("Please fill all fields");
      return;
    }

    try{
      const res= await signIn("credentials", {
        phone: signindata.phone,
        password: signindata.password,
        rememberMe,
        redirect: false,
       
      })
      if(res?.error){
        toast.error(res.error);
        return;
      }
      setSignindata({phone:'', password:''});
      toast.success("Signin successful");
      router.push("/");
    }
    catch (err) {
      console.log("Signin error ", err);
      toast.error("An error occurred during signin. Please try again")
     }
    
  };

  return (
    <div className="w-full max-w-md mx-auto">
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
        <CheckBoxComp
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Remember Me"
        />
        <div className="text-sm cursor-pointer hover:text-gray-800 text-purple-500 hover:underline">
          Forgot Password?
        </div>
      </div>

      <Button onClick={handleSignIn} label="Sign in" />

      <SubHeading
        label="Don't have an account?"
        to="/signup"
        onclicktext="Sign up"
      />
    </div>
  );
};