import { FC } from "react";
import { IField } from "../../interfaces/IField";
import { FormProvider, useForm } from "react-hook-form";
import { TextFieldInput } from "./fields/TextFieldInput";
import { Box, Button } from "@mui/material";
import { CSSProperties } from "styled-components";
import { CheckboxGroup } from "./fields/CheckboxGroup";

export interface IGeneralForm {
  onSubmit: (data: any) => void;
  fields: IField[];
}

const formStyle: CSSProperties = {
  display: "flex",
  flexFlow: "column wrap",
  gap: "10px",
};

export const GeneralForm: FC<IGeneralForm> = ({ onSubmit, fields }) => {
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={formStyle}>
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return <TextFieldInput key={field.name} {...field} />;

            case "checkboxes":
              return <CheckboxGroup key={field.name} {...field} />;

            default:
              return null;
          }
        })}

        <Box sx={{
          display: "flex",
          gap: "20px",
          alignSelf: "flex-end"
        }}>
          <Button
            type="reset"
            variant="contained"
            color="inherit"
            onClick={() => methods.reset()}
          >
            Очистить
          </Button>
          <Button type="submit" variant="contained" color="success">
            Создать
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
