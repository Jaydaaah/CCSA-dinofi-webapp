"use client";

import MarkdownStream from "@/components/MarkdownStream";
import { FetchPromptStream } from "@/lib/extra_function";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import DinofiBubble from "../../../components/chat-bubbles/DinofiBubble";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import StartConvoPrompt from "./StartConvoPrompt";

interface Props {
    show: boolean;
}

const introduce_prompt =
    "Briefly introduce yourself, end with 'How can I help you'";

export default function StartMessage({ show }: Props) {
    const controls = useAnimationControls();
    const [showButton, setShowButton] = useState(false);
    const router = useRouter();

    const stream = useMemo(() => {
        return FetchPromptStream("/api/quick-stream", introduce_prompt);
    }, [show]);

    useEffect(() => {
        controls.set({
            opacity: show ? 1 : 0,
        });
    }, [show]);

    return (
        <>
            {show && (
                <>
                    <motion.div
                        initial={{
                            opacity: 0.0,
                        }}
                        animate={{
                            opacity: 1.0,
                        }}
                    >
                        <DinofiBubble>
                            <MarkdownStream
                                timestamp={Date.now()}
                                delay_ms={100}
                                onDoneStreaming={() => setShowButton(true)}
                            >
                                {stream}
                            </MarkdownStream>
                        </DinofiBubble>
                    </motion.div>
                    {showButton && (
                        <motion.div
                            className="flex flex-col mt-5"
                            initial={{
                                opacity: 0.0,
                            }}
                            animate={{
                                opacity: 1.0,
                            }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            <StartConvoPrompt className="self-stretch py-9 mx-8" />
                        </motion.div>
                    )}
                </>
            )}
        </>
    );
}
