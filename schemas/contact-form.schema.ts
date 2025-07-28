import * as z from "zod";

export const getContactFormSchema = (t: {
  validation: {
    name: string;
    email: string;
    phoneNumber: string;
    services: string;
    budget: string;
    message: string;
  };
}) =>
  z.object({
    name: z.string().min(1, { message: t.validation.name }),
    email: z.string().email({ message: t.validation.email }),
    phoneNumber: z.string().optional(),
    company: z.string().optional(),
    services: z.array(z.string()).optional(),
  });

export type ContactFormSchema = ReturnType<typeof getContactFormSchema>;
