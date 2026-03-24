import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/stores/authStore';
import { authApi } from '../api/authApi';
import type { SignupRequest } from '../api/authApi';

export const useSignup = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (body: SignupRequest) => authApi.signup(body),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
    },
  });
};
