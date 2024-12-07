import { Button } from "@repo/ui/authbutton";
import { Heading } from "@repo/ui/heading";
import { Input } from "@repo/ui/input";
import { SubHeading } from "@repo/ui/subheading";
import { SignUpInputType } from "@repo/validation/inputValidation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";


export const SignUpform= ()=>{
    const [signupdata, setSignupdata] = useState<SignUpInputType>({
        name:'',
        phone:'',
        password:'',
    })
   async function handleSignUp() {
        console.log({ signupdata });
        if(signupdata.name.trim().length < 1 || signupdata.phone.trim().length < 1 || signupdata.password.trim().length < 1){
            toast.warning("Please fill all fields");
            return;
        }
        try{
            const res= await axios.post("http://localhost:3000/signup", signupdata);
            // toast.success("Account created successfully");
            if(res.data.error){
                toast.error(res.data.error);
                return;
            }
            else{
                toast.success("Account created successfully");
            }
        }
        catch(err){
            console.log("Signup error ", err);
            toast.error("An error occured, please try again");
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