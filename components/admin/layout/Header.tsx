import { NextComponentType } from "next";
import Image from "next/image";
import styled from './layout.module.scss';

export default function Header() {
  const company = '스마트그린 리빙랩';
  const user = '최고관리자'
  const time = '2022-08-29 10:00';

  return (
    <header className={styled.header}>
      <div className={styled.icons}>
        <Image src="/images/refresh.png" width="20" height="20" alt="새로고침" />
        <Image src="/images/alert.png" width="20" height="20" alt="알림" />
        <Image src="/images/home.png" width="20" height="20" alt="홈" />
      </div>
      <div>
        <div className={styled.company}>{company}페이지에 오신것을 환영합니다.</div>
        <div className={styled.time}>최종접속일시 : {time}</div>
        <div className={styled.user_info}>{user}</div>
      </div>
    </header> 
  )
}