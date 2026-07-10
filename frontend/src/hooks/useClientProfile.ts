"use client";

import { useMemo } from "react";
import { clientProfile } from "@/data/profile";

export function useClientProfile() {
  // computed experience numbers (temporary/hardcoded per client brief)
  const managerYears = 15; // années en tant que gérant de société
  const privateYears = 7; // années d'expérience avec les particuliers
  const totalYears = 15; // L'utilisateur a demandé d'afficher 15+ ans d'expérience globalement

  // memoize to keep stable reference in client components
  return useMemo(
    () => ({
      ...clientProfile,
      stats: {
        managerYears,
        privateYears,
        totalYears,
      },
    }),
    [],
  );
}
