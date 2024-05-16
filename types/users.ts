

export type Role = "INTERN" | "ENGINEER" | "ADMIN";
export interface UserData {
  id?: number;
  name?: string;
  email?: string;
  role: Role;
}