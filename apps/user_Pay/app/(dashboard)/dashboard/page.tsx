import { getBalanceHistory } from "@/app/utils/getHistory";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { BalanceChart } from "./_components/BalanceChart";

import { getProfile } from "@/app/utils/getProfile";
import { BalanceAndProfileCard } from "./_components/BalanceAndProfileCard";
import getBalance from "@/app/utils/getBalance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function() {
    const session= await getServerSession(authOptions);
        if(!session){
            redirect("/landing");
        }

    const getHistoryBalance = await getBalanceHistory();
    const getProfileData = await getProfile();
    const getBalanceData = await getBalance();



    return (
        <div className="min-h-scree px-5">
         <h1 className='text-5xl gradient-title'>Dashboard</h1>
                 
                   

            <Suspense
                fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}
                >
                     <BalanceAndProfileCard profile={getProfileData} balance={getBalanceData}/>
                    <BalanceChart balance={getHistoryBalance}/>
                </Suspense>
           
           
        </div>
    )
}