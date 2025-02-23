import SendCard from "./_components/SendCard";

export default function() {
    return (
        <div className="min-h-scree px-5">
         <h1 className='text-5xl gradient-title'>P2P Transfer</h1>
             <div className="w-full flex justify-center items-center pt-5">       
                <SendCard/>
            </div>
           
           
        </div>
    )
}