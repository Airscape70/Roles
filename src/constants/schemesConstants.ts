import * as yup from "yup";

export const USER_SCHEMA = yup
  .object()
  .shape({
    userName: yup
      .string()
      .required("Введите инициалы пользователя")
      .min(4, "Минимум 4 буквы")
      .matches(
        /^[А-ЯЁа-яё]+ [А-ЯЁ]\.[А-ЯЁ]\.$/,
        "Некорректно указаны инициалы"
      ),
    userRole: yup.string().required("Выберите роль"),
  })
  .required();

  export const ROLES_SCHEMA = yup
  .object()
  .shape({
    roleName: yup
      .string()
      .required("Введите название роли")
      .min(4, "Минимум 4 буквы")
      .matches(/^[а-яА-Я]*$/, "Только буквы кириллицы"),
    roleDescription: yup
      .string()
      .required("Введите описание роли")
      .min(4, "Минимум 4 буквы")
      .matches(/^[а-яА-Я]\s*/, "Только буквы кириллицы не более 50 символов"),
    permissions: yup.array().required(),
  })
  .required();