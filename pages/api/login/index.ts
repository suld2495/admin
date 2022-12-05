import { User } from "@prisma/client";
import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Message } from "types/message";
import { UserForm } from "types/user";

type NextLoginRequest = Omit<NextApiRequest, 'body'> & {
  body: UserForm
}

const handler = async (req: NextLoginRequest, res: NextApiResponse<User | Message>) => {
  const { userId, password } = req.body;
  
  const user = await prisma.user.findFirst({
    where: {
      userId,
      password
    }
  });

  if (!user) {
    res.status(400).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.', code: 'USER001' });
    return;
  }

  res.status(200).json(user);
};

export default handler;