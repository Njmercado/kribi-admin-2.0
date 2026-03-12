export interface IUser {
  email: string;
  username: string;
  role: string;
  entitlements: string[];
  is_active: boolean;
  full_name: string;
}
