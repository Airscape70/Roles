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
    name: "permissions",
    label: "Описание",
    type: "checkboxes",
    options: [
      {
        id: 1,
        label: "Permission1",
        value: "Permission1",
      },
      {
        id: 2,
        label: "Permission2",
        value: "Permission2",
      },
      {
        id: 3,
        label: "Permission3",
        value: "Permission3",
      },
      {
        id: 4,
        label: "Permission4",
        value: "Permission4",
      },
      {
        id: 5,
        label: "Permission5",
        value: "Permission5",
      },
      {
        id: 6,
        label: "Permission6",
        value: "Permission6",
      },
      {
        id: 7,
        label: "Permission7",
        value: "Permission7",
      },
      {
        id: 8,
        label: "Permission8",
        value: "Permission8",
      },
      {
        id: 9,
        label: "Permission9",
        value: "Permission9",
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
