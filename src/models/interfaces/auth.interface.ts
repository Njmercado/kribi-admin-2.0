export interface Token {
  access_token: string;
  token_type: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  username: string;
  role: string;
  entitlements: string[];
  is_active: boolean;
  full_name: string;
}
