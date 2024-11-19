import { Box, Typography } from '@mui/material';
import * as React from 'react';
import BasicModal from '../modal/BasicModal';
import { IBasicModal } from '../../interfaces/IBasicModal';


const boxStyle = {
  marginBottom: "2rem",
  display: "inline-flex",
  justifyContent: "space-between",
  width: "100%"
}

export interface ITableHeader{
  tabName: string,
  modalSettings: IBasicModal, 
}

const TableHeader: React.FC<ITableHeader> = ({tabName, modalSettings}) => {
  return (
      <Box sx={boxStyle}>
        <Typography variant="h4">{tabName}</Typography>
        <BasicModal {...modalSettings} />
      </Box>
  );
}

export default TableHeader