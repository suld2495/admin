import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { jwtMiddleware } from ".";
import errorHandler from "./error-handler";

const apiHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await jwtMiddleware(req, res);
      await handler(req, res);
    } catch (err) {
      errorHandler(err as Error, res);
    }
  }
}

export default apiHandler;