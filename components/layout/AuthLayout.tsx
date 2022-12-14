import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  const [authorized, setAuthorized] = React.useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const authCheck = useCallback((url: string) => {
    const publicPaths = ['/login'];
    const path  = url.split('?')[0];

    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true);
    }
  }, [router, user])

  React.useEffect(() => {
    authCheck(router.asPath);
  }, [authCheck, router.asPath]);

  return <>{authorized && children}</>;
}