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
    phoneNumber: z.string().min(7, { message: t.validation.phoneNumber }),
    company: z.string().optional(),
    services: z.array(z.string()).min(1, { message: t.validation.services }),
    budget: z.string().nonempty(t.validation.budget),
    message: z.string().min(10, { message: t.validation.message }),
  });

export type ContactFormSchema = ReturnType<typeof getContactFormSchema>;
