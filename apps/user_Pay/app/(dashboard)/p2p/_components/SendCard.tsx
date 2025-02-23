"use client";
import { p2pTransfer } from "@/app/lib/action/p2pTransfer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

type SendCardProps = {
  number: string;
  amount: string;
};

const SendCard = () => {
  const [sendcard, setSendcard] = useState<SendCardProps>({
    number: "",
    amount: "",
  });

  async function handleSubmit() {
    if (
      !sendcard.amount ||
      !sendcard.number ||
      isNaN(Number(sendcard.amount))
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    const loadingToast = toast.loading("Sending...");
    try {
      const sts = await p2pTransfer(
        sendcard.number,
        Number(sendcard.amount) * 100
      );

      toast.dismiss(loadingToast);
      if (sts !== false) {
        toast.success("Sent successfully");
        setSendcard({ number: "", amount: "" });
      } else {
        toast.error("Failed to send");
      }
    } catch (err: any) {
      toast.dismiss(loadingToast);
      if (err.response.data.error) {
        toast.warning(err.response.data.error);
      } else {
        console.error("An error occurred:", err);
        toast.error("An error occurred. Please try again later");
      }
    }
  }

  return (
    <Card className="p-6 w-96 shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Send</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pt-4 space-y-4">
          <label className="text-sm font-medium block">Number</label>
          <Input
            type="text"
            placeholder="Number"
            value={sendcard.number}
            onChange={(e) => {
              setSendcard({ ...sendcard, number: e.target.value });
            }}
          />
          <label className=" block text-sm font-medium">Amount</label>
          <Input
            type="text"
            placeholder="Amount"
            value={sendcard.amount}
            onChange={(e) => {
              setSendcard({ ...sendcard, amount: e.target.value });
            }}
          />
          <div className="pt-4 flex justify-center">
            <Button className="w-full gradient" onClick={handleSubmit}>Send</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SendCard;
