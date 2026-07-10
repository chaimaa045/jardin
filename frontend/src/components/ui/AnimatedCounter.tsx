"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number; 
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  value,
  duration = 2000, 
  suffix = "", 
  prefix = "",
  className 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      
      // Easing function (easeOutExpo)
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      const percentage = Math.min(progress / duration, 1);
      // 3. Utilisation de 'value' pour le calcul
      const currentCount = Math.floor(value * easeOut(percentage));
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // 4. Utilisation de 'value' pour la fin de l'animation
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]); // 5. Mise à jour des dépendances

  return (
    <span ref={countRef} className={cn("inline-block tabular-nums", className)}>
      {prefix}{count}{suffix}
    </span>
  );
}