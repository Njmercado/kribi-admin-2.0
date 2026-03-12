import { IUser } from "../interfaces/user.interface";

export interface UserDTO extends IUser {
  id: number;
}

export interface UserSearchResponseDTO {
  users: UserDTO[];
  has_next_page: boolean;
}

export interface UserSearchDTO {
  value: string;
  page: number;
  limit: number;
}

export interface UserUpdateDTO {
  id: number;
  email?: string;
  username?: string;
  role?: string;
  entitlements?: string[];
  is_active?: boolean;
  full_name?: string;
}
