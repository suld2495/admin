import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from 'lib/prisma';
import { Info } from "@prisma/client";
import apiHandler from "helpers/api/api-handler";

export type InfoForm = Omit<Info, 'postId' | 'createdAt' | 'updatedAt'>;

type ResponseData = {
  posts: Info[];    
  total: number;
}

type Query = {
  rowsPerPage: string;
  page: string;
}

const handler: NextApiHandler<ResponseData> = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function get(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { rowsPerPage = '10', page } = (req.query) as Query;

    try {
      const posts = await prisma.info.findMany({
        skip: (Number.parseInt(page) - 1) * Number.parseInt(rowsPerPage),
        take: Number.parseInt(rowsPerPage)
      });
    
      const total = await prisma.info.count();

      res.json({ posts, total });
    } catch {
      throw new Error('오류가 발생했습니다.');
    }
  }
}

export default apiHandler(handler);