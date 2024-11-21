export interface IRole {
  id: string;
  roleName: string;
  roleDescription: string;
  users: string[]
  permissions: string[];
};