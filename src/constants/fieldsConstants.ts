import { IField } from "../interfaces/IField";

export const ROLE_FIELDS: IField[] = [
  {
    name: "roleName",
    label: "Название роли",
    type: "text",
  },
  {
    name: "roleDescription",
    label: "Описание роли",
    type: "text",
  },
];

export const USER_FIELDS: IField[] = [
  {
    name: "userName",
    label: "Имя пользователя",
    type: "text",
  },
  {
    name: "availability",
    label: "Доступость",
    type: "checkbox",
  },
];

export const SELECT_FIELD: IField = {
  name: "roleName",
  label: "Выберите роль",
  type: "select",
  options: [],
};

export const CHECKBOX_FIELD: IField = {
  name: "permissions",
  label: "Описание",
  type: "checkboxes",
  options: [],
};
