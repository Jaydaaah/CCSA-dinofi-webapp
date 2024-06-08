"use client";
import { MotionConfig, motion } from "framer-motion";

function getGreeting(hour: number) {
    if (hour <= 11) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

interface Prop {
    delay: number;
    hour: number;
    nickname: string;
}

export default function HelloAnimated({ delay, hour, nickname }: Prop) {
    return (
        <motion.h1
            className="text-4xl md:text-5xl text-foreground font-serif text-center mt-10"
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay,
                duration: 1,
                ease: "circOut",
            }}
        >
            {`${getGreeting(hour)}, ${nickname}`}
        </motion.h1>
    );
}
