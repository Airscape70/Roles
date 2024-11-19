import { Button } from "@mui/material";
import { FC } from "react";

interface ISubmitButtonProps {
  submitBtnTitle?: string;
}
export const SubmitButton: FC<ISubmitButtonProps> = ({
  submitBtnTitle,
}) => {
  return (
    <Button type="submit" variant="contained" color="success">
      {submitBtnTitle ? submitBtnTitle : "Создать"}
    </Button>
  );
};
