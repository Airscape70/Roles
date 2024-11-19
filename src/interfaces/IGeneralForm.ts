import { IField } from "./IField";
import { IRole } from "./IRoles";
import { IUser } from "./IUser";

export interface IGeneralForm {
  defaultValues?: IUser | IRole,
  submitBtnTitle?: string,
  onSubmit: (data: any) => void;
  handleClose?: () => void,
  fields: IField[];
}
