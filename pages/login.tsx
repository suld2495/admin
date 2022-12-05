import React from 'react';
import Input from "components/common/input/Input";
import Title from "components/common/title/Title";
import { NextPage } from "next";
import { UserForm } from "types/user";
import styled from './login.module.scss';
import useForm from 'hooks/useForm';
import Button from 'components/common/button/Button';
import useLogin from 'hooks/useLogin';

const Login: NextPage = () => {
  const [login] = useLogin()
  const [form, handleChanage] = useForm<UserForm>({
    userId: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    login(form);
    e.preventDefault();
  }

  return (
    <div className={styled.login}>
      <div>
        <Title>로그인</Title>
        
        <form onSubmit={handleSubmit}>
          <Input 
            name="userId"
            value={form.userId}
            placeholder="아이디를 입력해주세요" 
            onChange={handleChanage} 
          />
          <Input 
            name="password" 
            type="password"
            value={form.password} 
            placeholder="비밀번호를 입력해주세요"
            onChange={handleChanage}
          />
          
          <div className={styled.btn_container}>
            <Button className={styled.login_btn} width='100%' height='45px'>로그인</Button>
            <Button className={styled.join_btn} width='100%' height='45px'>회원가입</Button>
          </div>
        </form>
      </div>
    </div>
  )    
};

export default Login;