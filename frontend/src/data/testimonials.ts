import { Testimonial } from "@/types";

export const getTestimonialsData = (t: any): Testimonial[] => [
  {
    id: "1",
    name: "Youssef B.",
    role: t("items.0.role"),
    content: t("items.0.content"),
    rating: 5,
  },
  {
    id: "2",
    name: "Amina El M.",
    role: t("items.1.role"),
    content: t("items.1.content"),
    rating: 5,
  },
  {
    id: "3",
    name: "Karim El Hafidi",
    role: t("items.2.role"),
    content: t("items.2.content"),
    rating: 5,
  },
  {
    id: "4",
    name: "Sarah W.",
    role: t("items.3.role"),
    content: t("items.3.content"),
    rating: 5,
  },
];