import { expressjwt } from 'express-jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import util from 'util';

export type NextConfig = {
  serverRuntimeConfig: {
    secret: string;
    refresh: string;
  }
}

const { serverRuntimeConfig } = getConfig() as NextConfig;

export const jwtMiddleware = <Request extends NextApiRequest, D>(req: Request, res: NextApiResponse<D>) => {
  const middleware = expressjwt({ 
    secret: serverRuntimeConfig.secret, 
    algorithms: ['HS256']
  }).unless({
    path: ['/api/users/authenticate']
  });

  return util.promisify(middleware)(req, res);
}