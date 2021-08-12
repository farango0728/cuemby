import { Request, Response } from "express";

export const Autorization = (req: Request, res: Response, next: any) => {
  if (req.headers.apikey === `${process.env.API_KEY}`) {
    next();
  } else {
    res
      .status(403)
      .send(
        `Sorry but you are not an admin and you do not have access to route ${req.url}`
      );
  }
};

export const AutorizationAdmin = (req: Request, res: Response, next: any) => {
  if (req.headers.apikey === `${process.env.API_KEY_ADMIN}`) {
    next();
  } else {
    res
      .status(403)
      .send(
        `Sorry but you are not an admin and you do not have access to route ${req.url}`
      );
  }
};
