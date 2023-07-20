export interface User {
  email: string | null;
  password: string | null;
  rememberMe: boolean | null;
}

export interface LoginResponse {
  result: {
    id: string;
    email: string;
    name: string;
    address: string;
    error: string;
  };
}
