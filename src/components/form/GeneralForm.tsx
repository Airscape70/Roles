import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextFieldInput } from "./fields/TextFieldInput";
import { CheckboxGroup } from "./fields/CheckboxGroup";
import { SelectFieldInput } from "./fields/SelectFieldInput";
import { FormButtonsBox, formStyle } from "./GeneralFormStyles";
import { ResetButton } from "../common/ResetButton";
import { SubmitButton } from "../common/SubmitButton";
import { IGeneralForm } from "../../interfaces/IGeneralForm";

export const GeneralForm: FC<IGeneralForm> = ({
  onSubmit,
  fields,
  defaultValues,
  submitBtnTitle,
  handleClose,
}) => {
  const methods = useForm({ mode: "onChange", defaultValues: defaultValues });
  const handleSubmit = (data: any) => {
    onSubmit(data);
    handleClose!();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} style={formStyle}>
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return <TextFieldInput key={field.name} {...field} />;

            case "checkboxes":
              return <CheckboxGroup key={field.name} {...field} />;

            case "select":
              return <SelectFieldInput key={field.name} {...field} />;

            default:
              return null;
          }
        })}

        <FormButtonsBox>
          <ResetButton onClick={() => methods.reset()} />
          <SubmitButton submitBtnTitle={submitBtnTitle} />
        </FormButtonsBox>
      </form>
    </FormProvider>
  );
};
