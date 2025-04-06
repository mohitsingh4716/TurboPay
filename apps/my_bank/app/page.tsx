import { MainPage } from "@/components/MainPage";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            <p className="text-gray-700 text-lg font-semibold">Loading TurboBank Services...</p>
          </div>
        }
      >
        <MainPage />
      </Suspense>
    </div>  
  );
}
