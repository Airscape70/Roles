export interface IOption {
  id: number | string;
  label: string;
  value: string;
  isChecked?: boolean
}

export interface IField {
  name: string;
  label: string;
  type?: string;
  options?: IOption[];
  pattern?: RegExp;
  errorMessage?: string;
}
