import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { SignupRequest } from '../api/authApi';

export const useSignup = () => {
  return useMutation({
    mutationFn: (body: SignupRequest) => authApi.signup(body),
  });
};
