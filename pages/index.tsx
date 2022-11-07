import React from 'react';
import Title from 'components/admin/common/title/Title';
import Button from 'components/common/button/Button';
import Pagination from 'components/common/pagination/Pagination';
import Select from 'components/common/select/Select';
import Table from 'components/common/table/Table';
import type { NextPage } from 'next'
import styled from './index.module.scss';

const Home: NextPage = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styled.div}>
      <Title title='기업회원목록'/>
      <div className={styled.selectBoxes}>
        <Select name='1' defaultValue='전체' />
        <Select name=''  defaultValue='분야' />
        <Select name=''  defaultValue='기업명' />
        <Select name=''  defaultValue='설립일' />
      </div>
      <Table
        className={styled.table}
        data={[]}
        columns={[
          {
            title: 'no',
            field: 'no'
          }, {
            title: '기업규모',
            field: 'no1'
          }, {
            title: '기업명',
            field: 'no2'
          }, {
            title: '근로자수',
            field: 'no3'
          }, {
            title: '매출액',
            field: 'no4'
          }, {
            title: '주요사업분야',
            field: 'no5'
          }, {
            title: '산업구분',
            field: 'no6'
          }, {
            title: '소재지',
            field: 'no7'
          }, {
            title: '설립일',
            field: 'no8'
          }, {
            title: '홈페이지',
            field: 'no9'
          }
        ]}
      />
      <div className={styled.buttons}>
        <Button>선택삭제</Button>
        <Pagination
          page={page} 
          total={101}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Home
