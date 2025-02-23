import { Suspense } from "react";

import { BarLoader } from 'react-spinners'
import Transactions from "./page";

export default function Layout() {
    return (
        <div className='px-5'>
        <h1 className=' text-5xl gradient-title'>Transactions</h1>
        
        <Suspense
            fallback= {<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}
        >
           <Transactions/>
          
        </Suspense>
    </div>
    )
  }
  