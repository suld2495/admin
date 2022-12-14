import React, { ReactNode } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import styled from './layout.module.scss';
import Footer from "./Footer";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [authorized, setAuthorized] = React.useState(false);
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    authCheck(router.asPath);
  }, [router.asPath]);

  function authCheck(url: string) {
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
  }

  return (
    <>
      <div className={styled.layout}>
        <Navibar />
        <div>
          <Header />

          <main>
            {authorized && children}
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}