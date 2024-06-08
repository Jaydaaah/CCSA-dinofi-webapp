"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function MotionBG() {
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme();

    useEffect(() => {
      if (!mounted)
          setMounted(true);
  }, [mounted]);

    if (!mounted) return null;

    return <>
    <section className={theme != "light" ? "shooting" : "shooting shooting-light"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </section>
    </>
}