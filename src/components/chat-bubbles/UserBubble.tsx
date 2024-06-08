import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface Props {
    timestamp?: number;
    children: ReactNode;
}

export default function UserBubble({ children, timestamp }: Props) {
    const time_string = useMemo(() => {
        if (timestamp) {
            return new Date(timestamp).toLocaleString();
        }
    }, [timestamp]);

    return (
        <motion.section
            initial={{
                x: 100,
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 1,
                ease: "anticipate",
            }}
            viewport={{
                once: true,
            }}
            className="self-end text-justify shadow-small shadow-primary-foreground bg-primary-100 bg-opacity-50 rounded-xl px-3 my-2 max-w-[80%] min-w-[5%]"
            title={time_string}
        >
            {children}
        </motion.section>
    );
}
