import { Button } from "@mui/material";
import { FC } from "react";

interface IResetButtonProps {
  onClick: () => void;
}
export const ResetButton: FC<IResetButtonProps> = ({onClick}) => {
  return <Button type="reset" variant="contained" color="inherit" onClick={onClick}>
    Очистить
  </Button>;
};
