import * as React from "react";
import { IField } from "../../../interfaces/IField";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@mui/material";

export const CheckboxFieldInput: React.FC<IField> = ({ name, label, type }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field }) => (
        <>
          <Checkbox
            title={label}
            onChange={(e) => field.onChange(e)}
            value={field.value !== undefined ? field.value : ""}
          />
        </>
      )}
    />
  );
};
