import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IBasicModal } from "../../interfaces/IBasicModal";
import { modalBoxStyle, modalIconStyle } from "./BasicModalStyles";
import { GeneralForm } from "../form/GeneralForm";

const BasicModal: React.FC<IBasicModal> = ({
  btnTitle,
  BtnIcon,
  modalTitle,
  formSetting,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = React.useCallback(() => setOpen(true), [setOpen]);
  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <Box>
      {btnTitle ? (
        <Button onClick={handleOpen} variant="contained">
          {btnTitle}
        </Button>
      ) : (
        <Tooltip title="Изменить">
          <IconButton onClick={handleOpen}>
            <BtnIcon />
          </IconButton>
        </Tooltip>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <IconButton onClick={handleClose} sx={modalIconStyle}>
            <CloseIcon fontSize="large" color="action" />
          </IconButton>

          <Typography variant="h4" textAlign="center">
            {modalTitle}
          </Typography>
          <Box>
            <GeneralForm {...formSetting} handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicModal;
