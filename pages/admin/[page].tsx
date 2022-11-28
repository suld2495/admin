import React from 'react';
import Title from 'components/admin/common/title/Title';
import Button from 'components/common/button/Button';
import Pagination from 'components/common/pagination/Pagination';
import Select from 'components/common/select/Select';
import Table from 'components/common/table/Table';
import type { NextPage } from 'next'
import styled from '../index.module.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from 'services/post.api';

const Home: NextPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, status } = useQuery(['posts', page], async () => await fetchPosts(page));
  const handleChange = (page: number) => {
    setPage(page);
  };

  if (status === 'loading') {
    return <div>로딩중</div>
  }

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
            field: 'postId',
            align: 'center'
          }, {
            title: '제목',
            field: 'title'
          }, {
            title: '내용',
            field: 'contents1'
          }
        ]}
      />
      <div className={styled.buttons}>
        <Button>선택삭제</Button>
        <Button href='/admin/write'>글쓰기</Button>
      </div>
      <div className={styled.paging}>
        <Pagination
          page={page} 
          total={data!.total}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Home
