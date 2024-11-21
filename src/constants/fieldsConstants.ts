import { IField } from "../interfaces/IField";

export const ROLE_FIELDS: IField[] = [
  {
    name: "roleName",
    label: "Название роли",
    type: "text",
    placeholder: "Директор",
  },
  {
    name: "roleDescription",
    label: "Описание роли",
    type: "text",
  }
];

export const USER_FIELD: IField = {
    name: "userName",
    label: "Имя пользователя",
    type: "text",
    placeholder: "Иванов И.И.",
};

export const AVAILABILITY_FIELD: IField = {
    name: "availability",
    label: "Доступость",
    type: "checkbox",
};

export const SELECT_ROLE_FIELD: IField = {
  name: "userRole",
  label: "Выберите роль",
  type: "select",
  options: [],
};

export const PERMISSIONS_FIELD: IField = {
  name: "permissions",
  label: "Описание",
  type: "checkboxes",
  options: [],
};
