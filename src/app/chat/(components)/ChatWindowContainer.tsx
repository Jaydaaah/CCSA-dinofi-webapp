"use client";

import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
    chat_ids: string[];
    children?: ReactNode[];
    animation_delay?: number
}

export default function ChatWindowContainer({ chat_ids, children, animation_delay }: Props) {
    return (
        <motion.section
        initial={{
            opacity: 0,
            y: 30
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        transition={{
            duration: 0.8,
            ease: "backOut",
            delay: animation_delay ?? 1
        }}
        className="my-10 flex flex-col"
        >
            <span
                className="self-center my-5">Here are your previous conversations</span>
            {children}
        </motion.section>
    );
}
