



export enum Roles {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  MANAGER = "ROLE_MANAGER",
}

interface Role {
  id: number;
  roleName: Roles;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  avatar: string;
  fullName: string;
  point?: number;
  roles: Role[];
  permission?: string;
  status: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}