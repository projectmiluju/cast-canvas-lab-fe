import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/stores/authStore';
import { authApi } from '../api/authApi';
import type { LoginRequest } from '../api/authApi';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (body: LoginRequest) => {
      const tokens = await authApi.login(body);
      setAuth(tokens.accessToken, { email: '', name: '' });
      const user = await authApi.getMe();
      return { tokens, user };
    },
    onSuccess: ({ tokens, user }) => {
      setAuth(tokens.accessToken, { email: user.email, name: user.nickname });
    },
  });
};
