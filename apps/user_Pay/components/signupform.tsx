
import { Heading } from "@repo/ui/heading";
import { Input } from "@repo/ui/input";
import { SignupInputTypes } from "@repo/validation/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { createBalance } from "@/app/lib/action/createBalance";
import { Button } from "./ui/button";

export const SignUpform = () => {
  const [signupdata, setSignupdata] = useState<SignupInputTypes>({
    name: "",
    phone: "",
    password: "",
  });
  const router = useRouter();
  async function handleSignUp() {
    if (
      signupdata.name.trim().length < 1 ||
      signupdata.phone.trim().length < 1 ||
      signupdata.password.trim().length < 1
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    const loadingToast = toast.loading("Creating account...");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        signupdata
      );
      if (res.data.error) {
        toast.dismiss(loadingToast);
        toast.error(res.data.error);
        return;
      } else {
        const res = await signIn("credentials", {
          phone: signupdata.phone,
          password: signupdata.password,
          redirect: false,
        });
        if (res?.error) {
          toast.dismiss(loadingToast);
          toast.error(res.error);
          return;
        }

        setSignupdata({ phone: "", password: "", name: "" });
        await createBalance();
        toast.dismiss(loadingToast);
        toast.success("Account created successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      if (err.response.data.error) {
        toast.warning(err.response.data.error);
      } else {
        console.error("An error occurred:", err);
        toast.error("An error occurred. Please try again later");
      }
    }
  }

  return (
    <Card className="w-full max-w-md p-10 mx-auto">
      <div className="w-full max-w-md mx-auto">
        <Heading label="Create an account" />
        <p className="text-gray-500 mb-6">
          Sign up to continue with your payment
        </p>
        <Input
          label="Name"
          type="text"
          placeholder="Enter your Full Name"
          value={signupdata.name}
          onChange={(e) =>
            setSignupdata({ ...signupdata, name: e.target.value })
          }
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          value={signupdata.phone}
          onChange={(e) =>
            setSignupdata({ ...signupdata, phone: e.target.value })
          }
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={signupdata.password}
          onChange={(e) =>
            setSignupdata({ ...signupdata, password: e.target.value })
          }
        />
       
       <div className="pt-4 flex justify-center ">
                 <Button className="w-full gradient " onClick={handleSignUp}> Create Account</Button>
       </div>

        
         <div className="pt-4 flex justify-center">
         <p>Already have an account? </p>
         <span>
            <a href="/signin" className="gradient-title hover:to-black"> Sign in</a>
         </span>
       </div>
      </div>
    </Card>
  );
};
