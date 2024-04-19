import {NextFunction, Request, Response} from "express";
import {AnyZodObject} from "zod";
// this is used as a middleware to validate the req body according to zod schema
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
