export type Role = 'guest' | 'admin';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  /** auth token */
  access_token: string;
  token_type: string;
  success: boolean;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
