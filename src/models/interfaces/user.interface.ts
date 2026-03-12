import { ENTITLEMENTS } from "@/contants/entitlements.constant";
import { ROLES } from "@/contants/roles.constant";

export interface IUser {
  email: string;
  username: string;
  role: ROLES;
  entitlements: Array<ENTITLEMENTS>;
  is_active: boolean;
  full_name: string;
  name: string;
  last_name: string;
  is_super_user: boolean;
  phone?: string;
  location?: string;
}