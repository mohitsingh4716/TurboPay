
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type onRampProps= {
    transactions: {
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
              <div className="pt-2">
                {transactions.map(t => <div className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                        {/* <div>{t.status}</div> */}
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>

                </div>)}
            </div>

          </CardContent>

      </Card>  

    )
}

export enum OnRampStatus {
    Success="Success",
    Failure="Failure",
    Processing="Processing"
  }