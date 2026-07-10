"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function useCounter(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, end, {
      duration,
      onUpdate(value) {
        setCount(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [end, duration]);

  return count;
}
