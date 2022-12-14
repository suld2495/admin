import { User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_EXPIRED } from "lib/constants";
import { useRouter } from "next/router";
import { setAuthorization } from "services/api";
import * as authApi from "services/api/auth.api";
import { userKey } from "services/query-key";
import { UserForm } from "types/user";

type AuthResponse = {
  user: User | null;
  login: (form: UserForm) => void;
  logout: () => void
}

export default function useAuth(): AuthResponse {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: userKey.user,
    queryFn: async (): Promise<User> => {
      const { user, accessToken } = await authApi.getUser();
      setAuthorization(accessToken);
      return user;
    },
    staleTime: AUTH_EXPIRED,
    initialData: null,
    
    onError: (err: Error) => {
      console.log(err);
    }
  });

  const loginMutation = useMutation((form: UserForm) => {
    return authApi.login(form);
  }, {
    onSuccess({ user, accessToken }: authApi.UserRespone) {
      setAuthorization(accessToken);
      queryClient.setQueryData(userKey.user, user);

      router.push(router.query.returnUrl as string || '/');
    },

    onError(code: Error) {
      alert(code.message);
    }, 
  });

  const logoutMutation = useMutation(() => {
    return authApi.logout();
  });

  return {
    user: data, 
    login: loginMutation.mutate,
    logout: ''
  };
}