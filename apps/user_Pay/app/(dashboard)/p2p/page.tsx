import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SendCard from "./_components/SendCard";

export default async function() {
     const session= await getServerSession(authOptions);
        if(!session){
            redirect("/landing");
        }
    return (
        <div className="min-h-scree px-5">
         <h1 className='text-5xl gradient-title'>P2P Transfer</h1>
             <div className="w-full flex justify-center items-center pt-5">       
                <SendCard/>
            </div>
           
           
        </div>
    )
}