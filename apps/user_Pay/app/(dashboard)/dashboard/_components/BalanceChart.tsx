"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Balance {
  date: string | Date;
  amount: number;
}

interface AccountChartProps {
    balance: Balance[];
}

const DATE_RANGES: Record<string, { label: string; days: number | null }> = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last 1 Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  All: { label: "All Time", days: null },
};

export const BalanceChart: React.FC<AccountChartProps> = ({ balance }) => {
  const [dateRange, setDateRange] = useState<string>("1M");
  // console.log(balance);

  const filterData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();

    const startDate = range?.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = balance
      .filter(
        (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
      )
      .map((t) => ({
        date:new Date(t.date),
        displayDate: format(new Date(t.date), "MMM dd"),
        amount: t.amount,
      }));


    return Object.values(filtered).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [balance, dateRange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-2xl font-semibold">
          Balance Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filterData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="displayDate"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
               content={({active, payload }) => {
                if (!payload || payload.length === 0 || !payload[0]?.payload.date) {
                  return null;
                }
            
                const date = new Date(payload[0]?.payload.date);
                const formattedDate = format(date, "dd MMM h:mma, yyyy");
            
                return (
                  <div className="bg-white border border-gray-300 p-2 rounded-md shadow-md">
                    <p className="text-black font-medium">{formattedDate}</p>
                    <p className="gradient-title font-semibold">Balance: ₹{payload[0].value}</p>
                  </div>
                );
              }}
              />
              <Bar
                dataKey="amount"
                name="Amount"
                fill="#4A7CE0"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

