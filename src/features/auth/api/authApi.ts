import { apiClient } from '../../../shared/api/apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
}

export const authApi = {
  login: (body: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', body, { skipAuth: true }),

  signup: (body: SignupRequest) =>
    apiClient.post<AuthResponse>('/auth/signup', body, { skipAuth: true }),
};
