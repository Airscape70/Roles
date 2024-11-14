import * as React from "react";
import { IField } from "../../../interfaces/IField";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export const TextFieldInput: React.FC<IField> = ({ name, label, type }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true, minLength: 5 }}
      render={({ field }) => (
        <TextField
          label={label}
          autoComplete={type}
          type={type}
          size="small"
          margin="normal"
          onChange={(e) => field.onChange(e)}
          value={field.value !== undefined ? field.value : ""}
        />
      )}
    />
  );
};
