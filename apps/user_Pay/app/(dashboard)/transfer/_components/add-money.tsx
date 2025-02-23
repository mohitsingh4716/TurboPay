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

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
      <Card className="p-6  shadow-md">
        <CardHeader>
          <CardTitle>Add Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="text"
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
              onClick={async () => {
                await createOnRampTransaction(amount*100, provider);
                window.location.href = redirectUrl || "";
              }}
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
