import {AdoptionRequest} from "@prisma/client";
import prisma from "../../../shared/prisma";

// service to insert adoption requests data to the database along with the current user id
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

// service to get all adoption requests data from the database
const getAdoptionRequestsFromDB = async () => {
  const result = await prisma.adoptionRequest.findMany();
  console.log({result});
  return result;
};
// service to update adoption requests status data to the database using request id
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
