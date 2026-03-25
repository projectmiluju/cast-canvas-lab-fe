import { apiClient } from '../../../shared/api/apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  email: string;
  nickname: string;
}

export const authApi = {
  login: (body: LoginRequest) =>
    apiClient.post<TokenResponse>('/auth/login', body, { skipAuth: true }),

  signup: (body: SignupRequest) =>
    apiClient.post<AuthUser>('/auth/signup', body, { skipAuth: true }),

  getMe: () => apiClient.get<AuthUser>('/users/me'),
};
