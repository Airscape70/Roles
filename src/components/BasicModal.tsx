import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { GeneralForm, IGeneralForm } from "./form/GeneralForm";
import { IconButton, SvgIconTypeMap, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  border: "1px solid",
  borderRadius: "20px",
  width: "40vw",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 6,
};

interface IBasicModalProps {
  btnTitle?: string;
  BtnIcon?: any;
  modalTitle: string;
  formSetting: IGeneralForm;
}

const BasicModal: React.FC<IBasicModalProps> = ({
  btnTitle,
  BtnIcon,
  modalTitle,
  formSetting,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      {btnTitle ? (
        <Button onClick={handleOpen} variant="contained">
          {btnTitle}
        </Button>
      ) : (
        <IconButton onClick={handleOpen} >
          <BtnIcon />
        </IconButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: "0",
              top: "0",
            }}
          >
            <CloseIcon fontSize="large" color="action" />
          </IconButton>

          <Typography variant="h4" textAlign="center">
            {modalTitle}
          </Typography>
          <Box>
            <GeneralForm {...formSetting} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicModal;
