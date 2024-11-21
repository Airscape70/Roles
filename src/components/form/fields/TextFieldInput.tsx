import * as React from "react";
import { IField } from "../../../interfaces/IField";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";


export const TextFieldInput: React.FC<IField> = ({ name, label, type, placeholder }) => {
  const { control, formState: {errors}, register } = useFormContext();
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...register(name)}
          label={label}
          autoComplete={type}
          type={type}
          placeholder={placeholder}
          size="small"
          margin="normal"
          onChange={(e) => field.onChange(e)}
          value={field.value !== undefined ? field.value : ""}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message?.toString()}
        />
      )}
    />
  );
};
