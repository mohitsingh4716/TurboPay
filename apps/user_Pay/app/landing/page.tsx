import { LandingPage } from "@/components/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Landing() {
    const session= await getServerSession(authOptions);

    if(session){
        redirect("/dashboard");
    }

    return (
        <div>
            <LandingPage/>
           
        </div>
    )
}