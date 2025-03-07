import { MainPage } from "@/components/MainPage";
import { Suspense } from "react";

export default function Home() {
  return (
     <div>
     {/* <h1 className="text-2xl">  This is TurboBank Services</h1> */}
     <Suspense fallback={<div>Loading...</div>}>
       <MainPage/>
     </Suspense>
        
     </div>   
  );
}
