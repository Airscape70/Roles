export interface IOption {
  id: number | string;
  label: string;
  value: string;
}

export interface IField {
  name: string;
  label: string;
  type?: string;
  options?: IOption[];
  pattern?: RegExp;
  errorMessage?: string;
}
