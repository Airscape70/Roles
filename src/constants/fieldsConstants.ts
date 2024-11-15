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
  {
    name: "rolePermissions",
    label: "Описание",
    type: "checkboxes",
    options: [
      {
        id: 1,
        label: "Permisson1",
        value: "Permisson1",
      },
      {
        id: 2,
        label: "Permisson2",
        value: "Permisson2",
      },
      {
        id: 3,
        label: "Permisson3",
        value: "Permisson3",
      },
      {
        id: 4,
        label: "Permisson4",
        value: "Permisson4",
      },
      {
        id: 5,
        label: "Permisson5",
        value: "Permisson5",
      },
      {
        id: 6,
        label: "Permisson6",
        value: "Permisson6",
      },
      {
        id: 7,
        label: "Permisson7",
        value: "Permisson7",
      },
      {
        id: 8,
        label: "Permisson8",
        value: "Permisson8",
      },
      {
        id: 9,
        label: "Permisson9",
        value: "Permisson9",
      },
    ],
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
