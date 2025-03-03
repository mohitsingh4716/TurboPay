import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { format } from "date-fns";

interface ProfileProps {
    profile: {
        name: string,
        phone: string,
    },
    balance:{
        amount: number
    }
}

export const BalanceAndProfileCard = ({profile, balance}: ProfileProps) => {

    const currentDate = format(new Date(), "EEEE, dd MMM HH:mma, yyyy");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 py-2">
                <Card className="shadow-md w-full">
                     <CardHeader>
                        <CardTitle className="text-2xl font-semibold border-b"> Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between gap-4">
                        <p className="text-4xl font-bold gradient-title">{`Name: ${profile.name}`}</p>
                        <p className="text-xl font-semibold">{`Phone: ${profile.phone}` }</p>
                    </CardContent>
                  </Card>


                    <Card className="shadow-md w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold border-b">Total Balance</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between gap-4">
                        <p className="text-4xl font-bold gradient-title"> {`Balance : ${balance.amount/100}`}</p>
                        <p className="text-md text-gray-700">{currentDate}</p>
                    </CardContent>
                    </Card>
                </div>
    )
}