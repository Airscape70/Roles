import { IField } from "./IField";

export interface IGeneralForm {
  validate?: any,
  defaultValues?: any,
  submitBtnTitle?: string,
  onSubmit: (data: any) => void;
  handleClose?: () => void,
  fields: IField[];
}
