import DinoLogo from "@/resources/dino-30x30.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useMemo } from "react";

interface Props {
    timestamp?: number;
    children: ReactNode;
}
export default function DinofiBubble({ children, timestamp }: Props) {
    const time_string = useMemo(() => {
        if (timestamp) {
            return new Date(timestamp).toLocaleString();
        }
    }, [timestamp]);

    return (
        <motion.section
            initial={{
                x: -100,
                opacity: 0
            }}
            whileInView={{
                x:0,
                opacity: 1
            }}
            transition={{
                duration: 1,
                ease: "anticipate"
            }}
            viewport={{
                once: true
            }}
            className="flex py-2 text-justify"
            title={time_string}
        >
            <span
                className={`self-end flex-shrink-0 transition-colors border border-opacity-50 rounded-[50%] mb-2 
            bg-purple-300 border-purple-500 dark:bg-opacity-30 dark:bg-cyan-400 dark:border-cyan-600 bg-opacity-30 flex justify-center items-center`}
            >
                <Image
                    className="p-[5px]"
                    src={DinoLogo.src}
                    alt="hello"
                    width={40}
                    height={40}
                />
            </span>
            <div className="shadow-small shadow-default-foreground bg-default-100 dark:bg-default-100 bg-opacity-50 rounded-xl py-1 px-3 ml-2 mb-2 max-w-[80%] min-w-[5%]">
                {children}
            </div>
        </motion.section>
    );
}
