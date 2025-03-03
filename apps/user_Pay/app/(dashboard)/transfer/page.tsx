
import AddMoney from "./_components/add-money";
import BalanceCard from "./_components/balance-card";
import {OnRampTransactions } from "./_components/onRampTransactions";
import getBalance from "@/app/utils/getBalance";
import getOnRampTransactions from "@/app/utils/getOnRampTransactions";


export default async function TransferPage() {

    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
       
                <div>
                    <AddMoney />
                </div>
                <div className="">
                    <BalanceCard amount={balance?.amount} locked={balance.locked} />
                 <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
                </div> 
          
           
        </div>
    )
}