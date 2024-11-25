import * as React from "react";
import { IField } from "../../../interfaces/IField";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Typography } from "@mui/material";

export const CheckboxFieldInput: React.FC<IField> = ({ name, label }) => {
  const { register, control } = useFormContext();
  const { ref, ...rest } = register(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography variant="button" textAlign="center">
            {label}
            <Checkbox
              {...rest}
              inputRef={ref}
              checked={!!field.value}
              title={label}
              onChange={(e) => field.onChange(e)}
              value={field.value !== undefined ? field.value : ""}
            />
          </Typography>
        </>
      )}
    />
  );
};
