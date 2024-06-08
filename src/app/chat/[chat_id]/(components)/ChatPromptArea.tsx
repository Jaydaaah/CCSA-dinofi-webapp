"use client";
// Components
import { useMessage, useStreamable } from "@/hooks/Message/Message";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
    KeyboardEvent,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";

// Icons
import { FiSend } from "react-icons/fi";

interface Props {
    className?: string;
}

export default function ChatPromptArea({ className }: Props) {
    const { submit } = useMessage();
    const { streamCount } = useStreamable();

    const [prompt, setPrompt] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const isLoading = useMemo(() => {
        return streamCount != 0;
    }, [streamCount]);

    const submitButtonOnClick = useCallback(() => {
        submit();
        setPrompt("");
    }, [setPrompt]);

    const onPromptChange = useCallback(
        (text: string) => {
            if (!isLoading) setPrompt(text.trimStart());
        },
        [isLoading]
    );

    const keyListener = useCallback(
        ({
            key,
            shiftKey,
            preventDefault,
        }: KeyboardEvent<HTMLInputElement>) => {
            if (!shiftKey && key == "Enter" && !isLoading) {
                preventDefault();
                buttonRef.current?.click();
            }
        },
        [isLoading]
    );

    return (
        <motion.div
            initial={{
                y: 100,
            }}
            animate={{
                y: 0
            }}
            className={`self-center max-w-2xl mx-4 w-full border bg-opacity-80 dark:border-default-50 border-b-0 bg-background rounded-t-lg p-3 pb-4 ${className}`}>
            <Textarea
                endContent={
                    <Button
                        ref={buttonRef}
                        spinner={<Spinner color="white" size="sm" />}
                        size="sm"
                        color="primary"
                        isLoading={isLoading}
                        isIconOnly={true}
                        variant={prompt != "" ? "solid" : "flat"}
                        isDisabled={prompt == ""}
                        onClick={submitButtonOnClick}
                    >
                        {!isLoading && (
                            <span>
                                <FiSend />
                            </span>
                        )}
                    </Button>
                }
                className={`${className}`}
                radius="sm"
                placeholder="What can I help you with?"
                name="prompt"
                minRows={1}
                maxRows={3}
                size="lg"
                value={prompt}
                onValueChange={onPromptChange}
                onKeyDown={keyListener}
            />
        </motion.div>
    );
}
