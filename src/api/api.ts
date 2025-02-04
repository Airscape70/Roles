import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { IRole } from "../interfaces/IRole";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

const consoleError = (error: any) => {
  const errResponse = error.response
    ? `Статус: ${error.response.status}, Данные: ${error.response.data}`
    : error.request
    ? "Нет ответа"
    : `Ошибка настройки запроса: ${error.message}`;
  alert(`${errResponse}`);
};

//=============USERS=============

export const getUsers = () => {
  return instance
    .get("users")
    .then((response) => response.data)
    .catch(consoleError);
};

export const postUser = (user: IUser) => {
  return instance
    .post("users", user)
    .then((response) => response.data)
    .catch(consoleError);
};

export const deleteUser = (id: string) => {
  return instance
    .delete(`users/${id}`)
    .then((response) => response.data)
    .catch(consoleError);
};

export const updateUser = (user: IUser) => {
  return instance
    .patch(`users/${user.id}`, user)
    .then((response) => response.data)
    .catch(consoleError);
};

//=============Roles=============

export const getRoles = () => {
  return instance
  .get("roles")
  .then((response) => response.data)
  .catch(consoleError);
};

export const postRole = (role: IRole) => {
  return instance
  .post("roles", role)
  .then((response) => response.data)
  .catch(consoleError);
};

export const deleteRole = (id: string) => {
  return instance
  .delete(`roles/${id}`)
  .then((response) => response.data)
  .catch(consoleError);
};

export const updateRole = (role: IRole) => {
  return instance
  .patch(`roles/${role.id}`, role)
  .then((response) => response.data)
  .catch(consoleError);
};

export const getPermissions = () => {
  return instance
    .get("permissions")
    .then((response) => response.data)
    .catch(consoleError);
};