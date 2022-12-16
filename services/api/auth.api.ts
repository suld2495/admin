import { User } from "@prisma/client";
import { UserForm } from "types/user";
import axios from ".";

export type UserRespone = {
  user: User;
  token: string;
}

export const login = (form: UserForm): Promise<UserRespone> => {
  return axios.post('api/users/authenticate', form);
};

export const logout = () => {
  return axios.del('api/users/authenticate');
};

export const getUser = (): Promise<UserRespone> => {
  return axios.get('api/users/user');
}