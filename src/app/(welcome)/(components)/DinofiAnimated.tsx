"use client";
import { motion } from "framer-motion";

import DinoLogo from "@/resources/dino.png";
import { Suspense } from "react";
import Image from "next/image";
import TypewriterComponent from "typewriter-effect";

export default function DinofiAnimated() {
    return (
        <motion.div
            className="hover:cursor-grab active:cursor-grabbing z-40"
            initial={{
                scale: 0.1,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            whileTap={{
                scale: 1.02
            }}
            transition={{
                duration: 1,
                ease: "backOut"
            }}
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            dragSnapToOrigin
        >
            <motion.div
                className={`self-end flex-shrink-0 transition-colors border border-opacity-50 rounded-[50%] mb-2 
                    bg-purple-300 border-purple-500 dark:bg-opacity-30 dark:bg-cyan-400 dark:border-cyan-600 bg-opacity-30 flex justify-center items-center`}
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.03, 1],
                }}
                transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
            <motion.div className="bg-opacity-50 border dark:border-gray-500 bg-background rounded-lg rounded-es-none p-2 absolute left-[11rem] md:left-[15rem] bottom-[12rem] md:bottom-[17rem] z-10">
                <TypewriterComponent
                    options={{
                        cursor: "",
                        strings: ["Hi!", "I'm Dino-fi", "Hello!","What's your name?", "What can i help you?", "Proud CCSAians"],
                        loop: true,
                        autoStart: true,
                    }}
                />
            </motion.div>
                <Suspense>
                    <Image
                        draggable={false}
                        src={DinoLogo.src}
                        width={250}
                        height={0}
                        priority={true}
                        className="w-[150px] md:w-[250px] h-auto m-14"
                        alt="text"
                    />
                </Suspense>
            </motion.div>
        </motion.div>
    );
}
