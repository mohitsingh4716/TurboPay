import express from "express";
import db from "@repo/db/client";
const app = express();
import {z} from "zod";
import cors from "cors";

app.use(express.json())
app.use(cors())

 const webhookSchema= z.object({
    token:z.string(),
    user_identifier:z.string(),
    amount:z.number()
})

app.post("/hdfcWebhook", async (req, res) => {

    const {success} = webhookSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"Invalid Input Request"
        })
    }

    const {token, user_identifier, amount}= req.body;

    // const actualAmount= amount*100;

    const onRampTxn= await db.onRampTransaction.findFirst({
        where:{
            token
        }
    })
    // console.log(onRampTxn);

     //Complete: check if this onRampTxn is proceesing or not
    if(onRampTxn?.status !== "Processing"){
        res.status(411).json({
            message:"Transaction already processed"
        });
    }


    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

    const paymentInformation: {
        token: string;
        userId: string;
        amount: number;
    } = {
        token:token,
        userId:user_identifier,
        amount:amount
    };

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId:paymentInformation.userId
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
    finally{(async () => {
        await db.$disconnect();
      });
    }

})

app.listen(3003, ()=>{
    console.log("Webhook server running on port 3003");
});
