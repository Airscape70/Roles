export interface IOption {
  label: string;
  value: string;
  id: number;
}

export interface IField {
  name: string;
  label: string;
  type?: string;
  options?: IOption[];
  pattern?: RegExp;
  errorMessage?: string;
  isLoginField?: boolean;
}
