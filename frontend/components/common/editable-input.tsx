import { Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface EditableInputProps {
  value: string;
  setValue: (value: string) => void;
  textClassname?: string;
  inputClassName?: string;
}

export const EditableInput = React.memo(
  ({ value, setValue, textClassname, inputClassName }: EditableInputProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
      setIsEdit(true);
      inputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    useEffect(() => {
      if (!value && !isEdit) {
        setValue("Натисніть для зміни тексту");
      }
    }, [value, isEdit]);

    useOnClickOutside(inputRef, () => setIsEdit(false));

    return isEdit ? (
      <Input
        containerProps={{ className: `${inputClassName}` }}
        inputRef={inputRef}
        placeholder="Назва опитування..."
        value={value}
        onChange={handleChange}
      />
    ) : (
      <Typography
        className={`font-medium ${textClassname}`}
        onClick={handleEditClick}
      >
        {value}
      </Typography>
    );
  }
);
