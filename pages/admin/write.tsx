import { InfoForm } from 'pages/api/posts/[page]';
import React from 'react';
import styled from './write.module.scss';
import * as postsApi from 'services/post.api';
import { useMutation } from '@tanstack/react-query';

export default function Write() {
  const mutation = useMutation(async (param: InfoForm) => {
    return await postsApi.createPost(param);
  });
  const [form, setForm] = React.useState<InfoForm>({
    userId: 1,
    title: '',
    contents1: '',
    contents2: '',
    contents3: '',
    contents4: '',
    contents5: ''
  });

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    mutation.mutate(form);
    e.preventDefault();
  };

  return (
    <>
      <form className={styled.form} onSubmit={handleSubmit}>
        <label>
          <span>제목</span>
          <input name="title" onChange={handleChange} />
        </label>
        <label>
          <span>컨텐츠1</span>
          <input name="contents1" onChange={handleChange} />
        </label>
        <label>
          <span>컨텐츠2</span>
          <input name="contents2" onChange={handleChange} />
        </label>
        <label>
          <span>컨텐츠3</span>
          <input name="contents3" onChange={handleChange} />
        </label>
        <label>
          <span>컨텐츠4</span>
          <input name="contents4" onChange={handleChange} />
        </label>
        <label>
          <span>컨텐츠5</span>
          <input name="contents5" onChange={handleChange} />
        </label>
        <button type='submit'>전송</button>
      </form>
    </>
  )        
}
