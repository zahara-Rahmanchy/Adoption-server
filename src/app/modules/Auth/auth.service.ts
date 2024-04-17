// import {jwtHelpers} from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, {JwtPayload} from "jsonwebtoken";

const loginUser = async (payload: {email: string; password: string}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  console.log({isCorrectPassword});

  const accessToken = jwt.sign(
    {
      id: userData.id,
      email: userData.email,
    },
    "bf5d7fc8ed058a939b04798bff7cc85da1c9b5ed8f685b5906af24c6132ede20",
    {
      algorithm: "HS256",
      expiresIn: "15 days",
    }
  );
  console.log({accessToken}, {userData});
  const responseData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    token: accessToken,
  };
  return responseData;
};

export const AuthServices = {
  loginUser,
};
