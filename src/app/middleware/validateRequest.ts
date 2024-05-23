/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const zodParseData = await schema.parseAsync({ body: req.body });
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
};

export default validateRequest;
