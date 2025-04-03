"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOnRampTransaction } from "@/app/lib/action/createOnRampTransaction";
import { toast } from "sonner";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "http://localhost:3001/",
  },
  {
    name: "Axis Bank",
    redirectUrl: "http://localhost:3001/",
  },
];

const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  const handleSubmit= async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount")
      return
  }
  if (provider === "Choose Bank") {
      toast.error("Please select a bank")
      return
  }
  try {
      const {token} = await createOnRampTransaction(amount*100, provider);
      const safeRedirectUrl = redirectUrl || "https://turbo-pay-two.vercel.app/dashboard";


    if (typeof token !== 'string') {
      throw new Error("Invalid token received")
  }

  const redirectWithToken = `${safeRedirectUrl}?token=${encodeURIComponent(token)}`

  window.location.href = redirectWithToken

  } catch (err) {
    console.error(err)
    toast.error("An error occurred while adding money")
 }
  
  }

  return (
      <Card className="p-4  shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />

            <label className="text-sm font-medium">Bank</label>
            <Select
              onValueChange={(value) => {
                setRedirectUrl(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                    ""
                );
                setProvider(value);
              }}
              defaultValue={SUPPORTED_BANKS[0]?.name || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_BANKS.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* {JSON.stringify({ amount, provider, redirectUrl })} */}
           <div className="pt-6">
            <Button
              type="button"
              className="gradient text-white w-full"
              onClick={handleSubmit}
            >
              Add Money
            </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  );
};

export default AddMoney;
