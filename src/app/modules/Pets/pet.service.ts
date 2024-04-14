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

const getPetDataFromDB = async (metaOptions: any) => {
  console.log(metaOptions);
  const {limit, page, sortBy, sortOrder} = metaOptions;
  const result = await prisma.pets.findMany({
    skip: Number(page - 1) * limit,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  console.log({result});
  return result;
};

export const petServices = {
  insertPetDataService,
  getPetDataFromDB,
};
