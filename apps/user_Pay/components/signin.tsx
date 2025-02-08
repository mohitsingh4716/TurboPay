"use client";
import React from 'react';
import { Signinform } from "./signinform";
import { Card } from './ui/card';


export const SignInPage: React.FC = () => {
  return (
      <div className="flex min-h-screen ">
        <div className="flex flex-col justify-center flex-1 px-8 lg:px-20">
          <Signinform/>
        </div>
      </div> 
  );
};

