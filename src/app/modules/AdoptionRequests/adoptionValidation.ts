import {AdoptionStatus} from "@prisma/client";
import {z} from "zod";

const adoptionRequestsValidation = z.object({
  petId: z.string({required_error: "Pet Id Field value is required"}),
  petOwnershipExperience: z.string({
    required_error: "Pet Ownership Experience is required",
  }),
});

const updateAdoptionStatus = z.object({
  body: z.object({
    status: z
      .enum([
        AdoptionStatus.APPROVED,
        AdoptionStatus.PENDING,
        AdoptionStatus.REJECTED,
      ])
      .optional(),
    petOwnershipExperience: z.string().optional(),
  }),
});

export const adoptionRequestsValidationSchema = {
  adoptionRequestsValidation,
  updateAdoptionStatus,
};
