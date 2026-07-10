import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(once: boolean = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return { ref, isInView };
}
