import { Box } from '@mui/material';
import styled, { CSSProperties } from "styled-components";

export const formStyle: CSSProperties = {
  display: "flex",
  flexFlow: "column wrap",
  gap: "10px",
};

export const FormButtonsBox = styled(Box) ({
  display: "flex",
  gap: "20px",
  alignSelf: "flex-end",
})

