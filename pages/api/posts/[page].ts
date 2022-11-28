import { NextApiRequest, NextApiResponse } from "next";
import prisma from 'lib/prisma';
import { Info } from "@prisma/client";
import { RequestHandler } from "../type";

export type InfoForm = Omit<Info, 'postId' | 'createdAt' | 'updatedAt'>;

type ResponseData = {
  posts: Info[];    
  total: number;
}

type NextRequest = NextApiRequest & {
  query: {
    rowsPerPage: number;
    page: number;
  }
}

const get: RequestHandler<NextRequest, ResponseData> = async (req, res) => {
  const { rowsPerPage = 10, page } = (req.query);

  try {
    const posts = await prisma.info.findMany({
      skip: (page - 1) * rowsPerPage,
      take: rowsPerPage
    });
  
    const total = await prisma.info.count();

    res.json({ posts, total });
  } catch {
    throw new Error('오류가 발생했습니다.');
  }
}

const handler = async (req: NextRequest, res: NextApiResponse<ResponseData>) => {
  switch (req.method) {
    case 'GET':
      await get(req, res);
      break;
  }
}

export default handler;