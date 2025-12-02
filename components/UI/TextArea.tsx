import { cn } from "@/app/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  labelClassName?: string;
  placeholder?: string;
  inputClassName?: string;
  error?: string;
  label: string;
};

const TextAreaField = ({
  name,
  labelClassName,
  label,
  placeholder,
  error,
  inputClassName,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label className={labelClassName}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <textarea
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={cn(
              inputClassName,
              error ? "border border-red-500" : null
            )}
            aria-invalid={error ? "true" : "false"}
          />
        )}
      />
      {error && (
        <span className="text-red-500 text-[12px]" role="alert">
          {error}
        </span>
      )}
    </>
  );
};

export default TextAreaField;
