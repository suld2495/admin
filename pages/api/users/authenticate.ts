import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserForm } from "types/user";
import apiHandler from 'helpers/api/api-handler';
import getConfig from 'next/config';
import { NextConfig } from 'helpers/api';
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from 'lib/constants';

type NextLoginRequest = Omit<NextApiRequest, 'body'> & {
  body: UserForm
}

type LoginResponse = {
  user: User,
  token: string
}

const { serverRuntimeConfig } = getConfig() as NextConfig;

const handler = async (req: NextLoginRequest, res: NextApiResponse<LoginResponse>) => {
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { userId, password } = req.body;
  
    const user = await prisma.user.findFirst({
      where: {
        userId,
        password
      }
    });

    if (!user) throw '아이디 또는 비밀번호가 일치하지 않습니다.';

    try {
      const token = jwt.sign(user, serverRuntimeConfig.secret, { expiresIn: ACCESS_TOKEN_EXPIRED });
      const refreshToken = jwt.sign({ id: user.id }, serverRuntimeConfig.secret, { expiresIn: REFRESH_TOKEN_EXPIRED });

      res.setHeader('Set-Cookie', `token=${refreshToken}; path=/;`)
      res.status(200).json({
        user: {
          ...user,
          password: ''
        },
        token
      });
    } catch (e) {
      throw (e as Error).message;
    }
  }
  
};

export default apiHandler(handler);