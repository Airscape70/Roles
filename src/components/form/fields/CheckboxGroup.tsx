import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IField } from "../../../interfaces/IField";
import { CSSProperties } from "styled-components";


export const CheckboxGroup: FC<IField> = ({ name, label, options }) => {
  const { register, control } = useFormContext();
  const { ref, ...rest } = register(name);

  return (
    <Box>
      <Typography variant="h5"> {label} </Typography>
      <Controller
        control={control}
        rules={{ required: true }}
        name={name}
        render={({ field }) => (
          <FormGroup sx={{
            display: "flex",
            width: "100%",
            alignItems: "space-between",
            height: '150px',
          }}>
            {options?.map((opt, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox {...rest} inputRef={ref} />}
                value={opt.value}
                label={opt.label}
              />
            ))}
          </FormGroup>
        )}
      />
    </Box>
  );
};
