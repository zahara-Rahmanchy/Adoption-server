import {AdoptionRequest} from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertAdoptionRequestsToDB = async (data: any, id: string) => {
  console.log("data: ", data, "\n", "id:", id);

  const result = await prisma.adoptionRequest.create({
    data: {
      ...data,
      userId: id,
    },
  });
  console.log({result});
  return result;
};
const getAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  console.log({result});
  return result;
};

const updateAdoptionRequestsInDB = async (
  id: string,
  data: Partial<AdoptionRequest>
) => {
  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data,
  });
  console.log("updated service", {result});
  return result;
};

export const adoptionServices = {
  insertAdoptionRequestsToDB,
  getAdoptionRequestsFromDB,
  updateAdoptionRequestsInDB,
};
