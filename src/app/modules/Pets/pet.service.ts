import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const insertPetDataService = async (data: any) => {
  console.log("data: ", data, "\n");

  const result = await prisma.pets.create({
    data: data,
  });
  console.log({result});
  return result;
};

export const petServices = {
  insertPetDataService,
};
