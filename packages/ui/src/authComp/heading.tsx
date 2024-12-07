interface HeadingProps {  
    label: string;
}
export const Heading = ({label}:HeadingProps) =>{
    return (
        <div className="text-4xl font-semibold mb-4">{label}</div>
    )
}