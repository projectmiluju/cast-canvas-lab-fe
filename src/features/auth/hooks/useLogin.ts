import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/stores/authStore';
import { authApi, LoginRequest } from '../api/authApi';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (body: LoginRequest) => authApi.login(body),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
    },
  });
};
