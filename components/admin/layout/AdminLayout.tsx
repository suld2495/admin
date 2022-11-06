import { ReactNode } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import styled from './layout.module.scss';
import Footer from "./Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className={styled.layout}>
        <Navibar />
        <div>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}