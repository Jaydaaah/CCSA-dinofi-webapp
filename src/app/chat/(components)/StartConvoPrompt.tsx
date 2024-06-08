"use client";

import { setCookiePromptServerAction } from "@/actions/cookiePromptServerActions";
import { requestNewConvoServerAction } from "@/actions/requestNewConvoServerAction"
import { Textarea, Spinner } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useCallback, useRef, useState } from "react";

// Icons
import { FiSend } from "react-icons/fi";

interface Props {
    className?: string;
    animation_delay?: number
}

export default function StartConvoPrompt({ className, animation_delay }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const submitButtonOnClick = useCallback(async () => {
        setIsLoading(true);
        const chat_id = await requestNewConvoServerAction();
        if (chat_id) {
            if (prompt) {
                await setCookiePromptServerAction(chat_id, prompt);
            }
            router.push(`/chat/${chat_id}`);
        } else {
            setIsLoading(false);
        }
    }, [setPrompt, prompt, setIsLoading]);

    const onPromptChange = useCallback((text: string) => {
        if (!isLoading)
            setPrompt(text.trimStart());
    }, [isLoading]);

    const keyListener = useCallback(
        ({
            key,
            shiftKey,
            preventDefault,
        }: KeyboardEvent<HTMLInputElement>) => {
            if (!shiftKey && key == "Enter") {
                preventDefault();
                if (prompt != "")
                    buttonRef.current?.click();
            }
        },
        [prompt]
    );

    return (
        <motion.div
            className={`${className}`}
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 1,
                delay: animation_delay ?? 1,
                ease: "backOut"
            }}>
            <Textarea
                endContent={
                    <div className="flex justify-end">
                        <motion.button
                            initial={{
                                opacity: 0
                            }}
                            whileInView={{
                                opacity: 1
                            }}
                            className={`bg-primary hover:bg-opacity-80 duration-500 text-white text-sm rounded-lg h-9 ${
                                prompt == "" && !isLoading ? "w-28" : "w-9"
                            } disabled:bg-opacity-50 transition-all shadow-sm flex flex-row-reverse justify-start items-center overflow-hidden`}
                            ref={buttonRef}
                            onClick={submitButtonOnClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner className="flex-grow" color="white" size="sm" />
                            ) : (
                                <>
                                    <motion.span
                                        className="flex-shrink-0 mx-1 p-2"
                                        initial={{
                                            x: 10,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            x: 0,
                                            opacity: 1,
                                        }}
                                    >
                                        <FiSend />
                                    </motion.span>
                                    <AnimatePresence>
                                        {prompt == "" && (
                                            <motion.span
                                                className="text-nowrap flex-grow text-right"
                                                initial={{
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.5
                                                }}
                                            >
                                                {"Start New"}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </motion.button>
                    </div>
                }
                radius="sm"
                placeholder="What can I help you with?"
                name="prompt"
                minRows={prompt ? 3 : 1}
                size="lg"
                value={prompt}
                onValueChange={onPromptChange}
                onKeyDown={keyListener}
            />
        </motion.div>
    );
}
