import React from 'react';
import Button from 'components/common/button/Button';
import type { NextPage } from 'next'
import styled from './index.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styled.div}>
      <Button href='/admin/1'>게시판 바로가기</Button>
    </div>
  )
}

export default Home
