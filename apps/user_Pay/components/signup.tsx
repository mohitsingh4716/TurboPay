"use client"
import React from 'react';
import { ImageSection } from "@repo/ui/image"
import { SignUpform } from "./signupform"

export const SignUpPage: React.FC= ()=>{
    return (
        <div className="flex min-h-screen">
        <div className="flex flex-col justify-center  flex-1 px-8 lg:px-20">
          <SignUpform/>
        </div>
        <ImageSection/>
      </div>
    );
}