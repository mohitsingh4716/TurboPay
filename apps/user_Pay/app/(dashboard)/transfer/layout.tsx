import { Suspense } from "react";
import TransferPage from "./page";
import { BarLoader } from 'react-spinners'

export default function Layout() {
    return (
        <div className='px-5'>
        <h1 className=' text-5xl gradient-title'>Transfer</h1>
        
        <Suspense
            fallback= {<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}
        >
            <TransferPage/>
        </Suspense>
    </div>
    )
  }
  