import { getBalanceHistory } from "@/app/utils/getHistory";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { BalanceChart } from "./_components/BalanceChart";

export default async function() {

    const getHistoryBalance = await getBalanceHistory();

    return (
        <div className="min-h-scree px-5">
         <h1 className='text-5xl gradient-title'>Dashboard</h1>
             <div className="w-full flex justify-center items-center">       
              {/* {JSON.stringify(getHistoryBalance)} */}

            </div>

            <Suspense
                fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}
                >
                    <BalanceChart balance={getHistoryBalance}/>
                </Suspense>
           
           
        </div>
    )
}