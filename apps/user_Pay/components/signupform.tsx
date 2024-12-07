import { Button } from "@repo/ui/authbutton";
import { Heading } from "@repo/ui/heading";
import { Input } from "@repo/ui/input";
import { SubHeading } from "@repo/ui/subheading";
import { SignUpInputType } from "@repo/validation/inputValidation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export const SignUpform= ()=>{
    const [signupdata, setSignupdata] = useState<SignUpInputType>({
        name:'',
        phone:'',
        password:'',
    })
    const router=useRouter();
    async function handleSignUp() {
        
        if(signupdata.name.trim().length < 1 || signupdata.phone.trim().length < 1 || signupdata.password.trim().length < 1){
            toast.warning("Please fill all fields");
            return;
        }
        const loadingToast= toast.loading("Creating account...");
        try{
            const res= await axios.post("http://localhost:3000/api/auth/signup", signupdata);
            if(res.data.error){
                toast.dismiss(loadingToast);
                toast.error(res.data.error);
                return;
            }
            else{
                const res= await signIn("credentials", {
                    phone: signupdata.phone,
                    password: signupdata.password,
                    redirect: false,
                   
                  })
                  if(res?.error){
                    toast.dismiss(loadingToast);
                    toast.error(res.error);
                    return;
                  }
                 
                  setSignupdata({phone:'', password:'', name:''});
                  toast.dismiss(loadingToast);
                  toast.success("Account created successfully!");
                  router.push("/");
            }
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
        <div className="w-full max-w-md mx-auto">
           <Heading label="Create an account" />
              <p className="text-gray-500 mb-6">
                 Sign up to continue with your payment
               </p>
            <Input label="Name" type="text" placeholder="Enter your Full Name" value={signupdata.name} onChange={(e)=>setSignupdata({...signupdata, name:e.target.value})} />
            <Input label="Phone" type="tel" placeholder="Enter your phone number" value={signupdata.phone} onChange={(e)=>setSignupdata({...signupdata, phone:e.target.value})} />
            <Input label="Password" type="password" placeholder="Enter your password" value={signupdata.password} onChange={(e)=>setSignupdata({...signupdata, password:e.target.value})} />
            <Button onClick={handleSignUp} label="Create Account" />
            <SubHeading label="Already have an account?" to="/signin" onclicktext="Sign in" />
         </div>
    );
}