
interface ButtonProps{
    onClick:()=>void;
    label:string;
}

export const Button=({onClick, label}:ButtonProps)=>{
    return <button onClick={onClick} className="w-full mt-3  py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">{label}</button>
}