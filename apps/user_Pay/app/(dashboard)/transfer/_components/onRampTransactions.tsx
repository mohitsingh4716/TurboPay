
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        return  <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-center pb-8 pt-8">
              No Recent transactions
          </div>

        </CardContent>

    </Card> 
    }

    return (
      <Card>
          <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="pt-1">
              <div className="flex justify-between border-b pb-1 font-medium">
                        <div className="">
                            Details
                        </div>
                 
                     <div>Status</div>
                    <div>
                        Amount
                    </div>

                </div>
                {transactions.map(t => {
                  const statusConfig = getStatusConfig(t.status);
                  return (
                <div key={t.id} className="flex justify-between border-b p-1 hover:bg-gray-50 transition-colors">
                   
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                       
                    </div>
                     <div className={`flex gap-1 items-center m-1.5 px-3 py-1 ${getStatusConfig(t.status).bgColor} ${getStatusConfig(t.status).textColor} text-sm rounded-md`}> <statusConfig.icon size={16} />{t.status}</div>
                     <div className={`text-base font-medium ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        + ₹ {t.amount / 100}
                    </div>

                </div>
                )
                }
            )}
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
 
    