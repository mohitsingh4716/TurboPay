
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input= ({label, type, placeholder, value, onChange }:InputFieldProps) => {
  return (
    <div>
      <div>
      <div className="pl-2 text-[15px] font-medium mt-2">
            {label}
        </div>
      </div>
   
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full py-3 px-3 mt-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
     </div>
  );
};


