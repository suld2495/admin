import apiHandler from "helpers/api/api-handler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      refresh();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function refresh() {
    const token = req.headers['Set-Cookie'];

    console.log(token);
  }
};

export default apiHandler(handler);