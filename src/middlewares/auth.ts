import {NextFunction, Request, Response} from "express";
import catchAsync from "../shared/catchAsync";
import httpStatus from "http-status";
import {Secret} from "jsonwebtoken";
import {jwtHelpers} from "../app/helpers/jwtHelpers";
import ApiError from "../app/erros/ApiError";

const auth = () => {
  // eslint-disable-next-line no-unused-vars
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("headers", req.headers);
    const token = req.headers.authorization;

    // check if the token is not available
    // if (!token) {
    //   throw new UNAUTHORIZEDError(
    //     httpStatus.UNAUTHORIZED,
    //     "Unauthorized Access",
    //     "You do not have the necessary permissions to access this resource.",
    //     "",
    //     ""
    //   );
    // }

    if (!token) {
      // throw new Error("Unauthorized Access");
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized Access",
        "",
        "You do not have permission to access"
      );
    }
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      "bf5d7fc8ed058a939b04798bff7cc85da1c9b5ed8f685b5906af24c6132ede20" as Secret
    );
    const {exp} = verifiedUser;
    if (Math.floor(Date.now() / 1000) >= Number(verifiedUser?.exp)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized Access",
        "",
        "You do not have permission to access"
      );
    }
    console.log({verifiedUser});
    next();
  });
};

export default auth;
