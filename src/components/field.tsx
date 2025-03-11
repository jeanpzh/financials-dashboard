import React, { HTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  label: string;
  name: string;
  control: Control<any>;
}

type Option = {
  value: number;
  label: string | null;
};

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control<any>;
  type: "input" | "select" | "date" | "number";
  placeholder?: string;
  options?: Option[];
  value?: string;
}

export default function Field({
  label,
  name,
  control,
  type,
  placeholder,
  options,
  value,
}: Props) {
  const {
    _formState: { errors },
  } = control;
  return (
    <>
      {type === "input" && (
        <div className="grid gap-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            placeholder={placeholder}
            {...control.register(name)}
          />
          {errors[name] && (
            <span className="text-red-500">
              {errors[name].message?.toString()}
            </span>
          )}
        </div>
      )}
      {type === "select" && (
        <>
          <Label htmlFor={name}>{label}</Label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                value={field?.value.toString()}
                defaultValue={value}
                onValueChange={(value) => field.onChange(parseInt(value))}
              >
                <SelectTrigger className="w-full" id={name}>
                  <SelectValue placeholder= {placeholder}/>
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option, index) => (
                    <SelectItem key={index} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors[name] && (
            <span className="text-red-500">
              {errors[name].message?.toString()}
            </span>
          )}
        </>
      )}
      {type === "date" && (
        <div className="grid gap-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            type="date"
            placeholder={placeholder}
            {...control.register(name)}
          />
          {errors[name] && (
            <span className="text-red-500">
              {errors[name].message?.toString()}
            </span>
          )}
        </div>
      )}
    </>
  );
}
