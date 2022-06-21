import { NextFunction, Request, Response } from 'express';
interface NewReq extends Request {
  user: any;
}
export function userMiddleWare(req: NewReq, res: Response, next: NextFunction) {
  req.user = { roles: ['admin'] };
  next();
}
