"use client";
import { MotionConfig, motion } from "framer-motion";

export default function WelcomeAnimated() {
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "circOut",
            }}
        >
            <motion.h1
                className="text-6xl lg:text-8xl font-bold header text-foreground"
                initial={{
                    opacity: 0,
                    x: -20,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
            >
                Welcome!
            </motion.h1>
            <motion.h2
                className="text-3xl lg:text-4xl pl-3"
                initial={{
                    opacity: 0,
                    x: -20,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                }}
            >
                Students of CCSA
            </motion.h2>
        </MotionConfig>
    );
}
