import { User } from "@prisma/client";
import { UserForm } from "types/user";
import axios from ".";

export const login = (form: UserForm): Promise<User> => {
  return axios.post('api/login', form);
};