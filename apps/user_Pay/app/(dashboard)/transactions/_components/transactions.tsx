import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react'

interface p2pTxnsProps {
    transactions: {
        createdAt: Date,
        amount: number,
        status: string,
        toUserId: string,
        fromUserId: string,
        direction: string | null,
        id: string,
        toUserName: string,
        toUserPhone: string,
    }[];

}

  function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(dateString));
  }


const P2PTransaction = ({transactions}: p2pTxnsProps) => {

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
    <div>
    
        <Card className='w-full h-auto md:h-[650px] flex flex-col'>
            <CardHeader>
                <CardTitle>P2P Transactions </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="pt-1 bg-white z-10 border-b font-medium ">
              <div className="flex sticky top-0 justify-between bg-white">

                        <div>
                            Details
                        </div>
                        <div>
                            User
                        </div>
                        <div className='flex'>Status</div>

                        <div>
                            Amount
                        </div>
                    </div>


                    {transactions.map(t => {
                        return (
                            <div key={t.id} className="flex justify-between border-b p-1 hover:bg-gray-50 transition-colors">
                                <div>
                                    <div className="text-sm">
                                        {t.direction === "send" ? "Sent INR" : "Received INR"}
                                    </div>
                                    <div className="text-slate-600 text-xs">
                                        {formatDate(t.createdAt.toDateString())}
                                    </div>
                                </div>

                                <div className="">
                            {t.direction === "send" ? (
                                <>
                                    <div className="text-sm p-1 capitalize">To : {t.toUserName}</div>
                                    <div className="text-xs px-1 text-center">Phone : {t.toUserPhone}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-sm p-1 capitalize">From : {t.toUserName}</div>
                                    <div className="text-xs px-1 text-center">Phone : {t.toUserPhone}</div>
                                </>
                            )}
                        </div>

                        <div className={`flex items-center gap-1 m-0.5 lg:m-1.5 px-3 py-1 text-sm rounded-full ${t.status === "Success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {t.status === "Success" ? (
                                <CheckCircle size={16} />
                            ) : (
                                <XCircle size={16} />
                            )}
                            <span className='hidden md:block'>
                                  {t.status}
                            </span>
                          
                         </div>

                             <div className="flex flex-col              justify-center">
                               <span className={`font-semibold ${
                                t.direction === "send" ?  'text-red-700' :'text-green-600' 
                                }`}>
                                  {t.direction === "send"
                                ? `- ₹ ${Math.abs(t.amount) / 100}`
                                : `+ ₹ ${t.amount / 100}`}
                                </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </CardContent>
        </Card>

    </div>
  )
}

export default P2PTransaction