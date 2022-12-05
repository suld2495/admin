import { useMutation } from "@tanstack/react-query";
import * as loginApi from "services/api/user.api";
import { UserForm } from "types/user";

export default function useLogin(): [(form: UserForm) => void] {
  const validate = (form: UserForm) => {
    return (['userId', 'password'] as (keyof UserForm)[]).every((value) => form[value]);
  };

  const mutation = useMutation(async (form: UserForm) => {
    if (!validate(form)) {
      alert('아이디 또는 비밀번호를 확인해 주세요.');
      return;
    }

    await loginApi.login(form);
  }, {
    onError(code: Error) {
      if (code.message === 'USER001') {
        alert('아이디 또는 비밀번호가 일치하지 않습니다');
      }
    }
  });

  

  return [mutation.mutate];
}