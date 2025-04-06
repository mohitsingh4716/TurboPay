"use client";

import React, { useState, FC } from "react";
import {
  User,
  Key,
  ChevronRight,
  Shield,
  Check,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import {toast } from "sonner";
import { addMoney } from "@/action/addMoney";
import {checkCredentials } from "@/action/checkCredentials";
import axios from "axios";


export const MainPage: FC = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  const mainurl = process.env.API_URL || "https://turbo-pay-bank-webhook.onrender.com";
  // console.log(mainurl);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const searchParams= useSearchParams();

  const token= searchParams.get("token") || "";

  const handleSubmit = async() => {
    // console.log( data.password, data.userName);
    const loadingToast= toast.loading("Adding money to your account...");

    const user = await addMoney(token);


    if(user.transaction){

     const checkCredential = await checkCredentials(data.userName, data.password, user.transaction.amount);

     if(checkCredential.message==="Success"){
       await axios.post(`${mainurl}/hdfcWebhook`, {
        token: token,
        user_identifier: user.transaction.userId,
        amount: user.transaction.amount
       })

       toast.dismiss(loadingToast);
       toast.success("Money added successfully!");

       window.location.href = "https://turbo-pay-two.vercel.app/dashboard";
      }
      else {
        toast.warning(checkCredential.message);
      }

    }
    else{
      toast.dismiss(loadingToast);
      toast.error("Error adding money to your account. Please try again later.");
    }

  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 ">

      <div className="w-full bg-white shadow-sm py-3 px-4 flex justify-center items-center ">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 p-">
           Welcome to TurboBank
          </h1>
        </div>
      </div>


      <div className="bg-blue-500 text-white text-center p-4 text-lg md:text-xl font-semibold shadow-md w-full sticky top-0 z-50">
         Use <span className="underline">Username:</span>
        <span className="text-yellow-300"> Turbo_Bank </span> &
        <span className="underline"> Password:</span>
        <span className="text-yellow-300"> Turbo@111 </span> for testing!
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 p-4 md:p-8">
      
        <div className="w-full md:w-2/3 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Login to NetBanking
          </h2>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium  mb-2 flex items-center">
                <User size={18} className="mr-2 text-blue-600" />
                Username
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your Customer ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                value={data.userName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium  mb-2 flex items-center">
                <Key size={18} className="mr-2 text-blue-600" />
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              Continue
              <ChevronRight size={18} className="ml-2" />
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-center text-blue-800">
              Welcome to TurboBank NetBanking. Your security is our priority.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-lg shadow p-4">
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-green-600" size={48} />
          </div>

          <h3 className="text-xl font-semibold text-center mb-8">
            Banking Security
          </h3>

          <ul className="space-y-6">
            <li className="flex items-start">
              <Check
                className="text-green-600 mr-2 mt-1 flex-shrink-0"
                size={18}
              />
              <span className="text-sm">
                256-bit encryption for all transactions
              </span>
            </li>
            <li className="flex items-start">
              <Check
                className="text-green-600 mr-2 mt-1 flex-shrink-0"
                size={18}
              />
              <span className="text-sm">
                Multi-factor authentication for enhanced security
              </span>
            </li>
            <li className="flex items-start">
              <Check
                className="text-green-600 mr-2 mt-1 flex-shrink-0"
                size={18}
              />
              <span className="text-sm">
                24/7 fraud monitoring and alerts
              </span>
            </li>
            <li className="flex items-start">
              <Check
                className="text-green-600 mr-2 mt-1 flex-shrink-0"
                size={18}
              />
              <span className="text-sm">
                Secure socket layer (SSL) technology
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-blue-400 text-white p-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center text-sm">
            <div>© 2025 TurboBank. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
