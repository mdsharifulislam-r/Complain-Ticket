import React from "react";

export default function InputField(props:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>&{label?:string,error?:string}) {
  return (
    <div className="mb-3">
      <label
        className="block mb-1 text-sm font-bold text-gray-700"
        htmlFor={props?.id}
      >
        {props?.label}
      </label>
      <input
        className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded ${props?.error?"border-red-500":""}  appearance-none focus:outline-none focus:shadow-outline`}
        {...props}
      />
     {props?.error? <span className="text-xs text-red-500">
        {props?.error}
      </span>:""}
    </div>
  );
}
