import { NextApiRequest, NextApiResponse } from "next";

export interface RequestHandler<Request extends NextApiRequest, Response> {
  (req: Request, res: NextApiResponse<Response>): void;
}