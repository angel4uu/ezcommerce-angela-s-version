import { z } from "zod";

export const formSchema = z.object({
  nameStudent: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  profilePhoto: z.string().min(2).max(100),
  qrCode: z.string().min(2).max(100),
  institutionalCode: z.string().min(2).max(8),
  faculty: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  isMarca: z.boolean().default(false),
  nameMarca: z.string().optional(),
  logoMarca: z.string().optional(),
  descriptionMarca: z.string().optional(),
});
