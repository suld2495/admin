import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "../type";

const put: RequestHandler<NextApiRequest, number> = async (req) => {
  const form = req.body;
  console.log(form);
  try {
    await prisma.info.create({
      data: form
    });
  } catch (error) {
    throw new Error(error as any);
  }
};


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method) {
    case 'PUT':
      put(req, res);
  }    
};

export default handler;