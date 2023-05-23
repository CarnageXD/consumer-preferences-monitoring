import React from "react";

interface TextareaProps {
  value?: string;
  setValue?: (value: string) => void;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export const Textarea = ({
  value,
  setValue,
  className,
  placeholder,
  readOnly,
}: TextareaProps) => {
  return (
    <textarea
      readOnly={readOnly}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={`my-2 transition-all border-gray-300 p-2 resize-none w-full min-h-[150px] border-2 hover:border-primary-blue/50 focus:border-primary-blue active:border-primary-blue rounded-xl outline-none ${className}`}
    />
  );
};
