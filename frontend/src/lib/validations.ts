import * as z from "zod";

const phoneRegex = /^(0|[+]212)[567]\d{8}$/;

// 1. Notre schéma dynamique avec les traductions
export const getContactFormSchema = (t: any) => z.object({
  name: z.string().min(2, { message: t("name") }),
  phone: z.string().regex(phoneRegex, { message: t("phone") }),
  
  // Gestion parfaite de l'email : valide si rempli, accepté si vide (chaîne vide)
  email: z.union([
    z.string().email({ message: t("email") }),
    z.literal("")
  ]).optional(),
  
  projectType: z.string().optional(),

  // 🟢 GESTION DU MESSAGE OPTIONNEL : Valide si vide, ou réclame 10 caractères minimum s'il est rempli
  message: z.union([
    z.string().min(10, { message: t("message") }),
    z.literal("")
  ]).optional(),

  consent: z.boolean().refine((val) => val === true, {
    message: t("consent"),
  }),
});

// 2. LA CORRECTION MAGIQUE : On extrait le type directement depuis la fonction !
export type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>;