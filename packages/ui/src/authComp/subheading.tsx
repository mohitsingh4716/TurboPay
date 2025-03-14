
import { useRouter } from 'next/navigation';

interface SubHeadingProps {
    label: string;
    to: string;
    onclicktext: string;
}

export const SubHeading = ({label,to,onclicktext}:SubHeadingProps) => {
    const router = useRouter();
    return (
        <div className='flex gap-2 text-center justify-center  text-base text-gray-500 mt-4'>
            <div>
                {label}
            </div>
            <div className='hover:underline hover:text-gray-800 cursor-pointer text-blue-700 gradient-title' onClick={()=>{
                router.push(to)
            }}>
                {onclicktext}
            </div>

        </div>
    )
}