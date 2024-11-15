import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IField } from "../../../interfaces/IField";

export const SelectFieldInput: FC<IField> = ({ name, options, label }) => {
  const {
    control,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{mt: '10px'}}>
          <InputLabel id={name} size="small">
            {label}
          </InputLabel>
          <Select
            size="small"
            labelId={name}
            label={label}
            onChange={(e) => field.onChange(e)}
          >
            {options?.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

