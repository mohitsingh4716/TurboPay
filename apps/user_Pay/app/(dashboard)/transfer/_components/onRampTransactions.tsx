
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns";
import { CheckCircle, Clock, XCircle } from 'lucide-react';

type onRampProps= {
    transactions: {
        id: string,
        time: Date,
        amount: number,
        status: OnRampStatus,
        provider: string
  }[]
}

export const OnRampTransactions = ({transactions}:onRampProps) => {


    if (!transactions.length) {
        return  <Card className="w-full h-auto flex flex-col">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-center pb-8 pt-8">
              No Recent transactions
          </div>

        </CardContent>

    </Card> 
    }

    return (
      <Card  className="w-full h-auto md:h-[650px] flex flex-col">
          <CardHeader>
              <CardTitle className="text-2xl font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
              <div className="pt-1 bg-white z-10 border-b font-medium ">
              <div className="flex sticky top-0 justify-between bg-white">
                        <div>
                            Details
                        </div>
                 
                     <div>Status</div>
                    <div>
                        Amount
                    </div>

                </div>
                <div>
                {transactions.map(t => {
                  const statusConfig = getStatusConfig(t.status);
                  return (
                    <div key={t.id} className="flex justify-between border-b p-1 hover:bg-gray-50 transition-colors">
                      
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {/* {t.time.toDateString()} */}
                                 <span className='hidden md:block'>
                                   {format(t.time.toString(), "dd MMM yyyy, hh:mm a")}
                                  </span>
                                  <span className='md:hidden'>
                                   {format(t.time.toString(), "dd MMM yyyy")}
                                  </span>
                            </div>
                          
                        </div>
                        <div className={`flex gap-1 items-center m-1.5 px-3 py-1 ${getStatusConfig(t.status).bgColor} ${getStatusConfig(t.status).textColor} text-sm rounded-2xl`}> <statusConfig.icon size={16} />{t.status}</div>
                        <div className={`text-base font-medium ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            + ₹ {t.amount / 100}
                        </div>

                    </div>
                 ) }
            
               
            )}
               </div>
            </div>

          </CardContent>

      </Card>  

    )
}

const getStatusConfig = (status: OnRampStatus) => {
    const configs = {
      Success: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        icon: CheckCircle
      },
      Processing: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
        icon: Clock
      },
      Failure: {
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        icon: XCircle
      }
    };
    return configs[status];
  };

  export enum OnRampStatus {
    Success="Success",
    Failure="Failure",
    Processing="Processing"
  }
 
    