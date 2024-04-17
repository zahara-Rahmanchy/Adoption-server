import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {Prisma} from "@prisma/client";

const createUserService = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(String(data.password), 12);

  console.log("data: ", data, "\n", {hashedPassword});
  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
  };
  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};

const getUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return result;
};

export const userServices = {
  createUserService,
  getUsersFromDB,
};
