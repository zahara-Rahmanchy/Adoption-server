import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {Prisma, User} from "@prisma/client";
/**
 *
 * registers user data to the database, password is hashed and then sent to the db
 */
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

/***
 * retrieves all the user data from the database
 */
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
/**
 *
 *updates user data such as name and email in the db and this is ensured using zod
 */
const updateUserDataInDB = async (id: string, data: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });
  console.log("updated service", {result});
  return result;
};

export const userServices = {
  createUserService,
  getUsersFromDB,
  updateUserDataInDB,
};
