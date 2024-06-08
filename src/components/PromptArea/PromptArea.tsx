"use client";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import { KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";

// Icons
import { FiSend } from "react-icons/fi";

interface Props {
    sendlabel?: string;
    placeholder?: string;
    className?: string;
    isLoading?: boolean;

    action?: () => void
}

export default function PromptArea({
    action,
    isLoading,
    placeholder,
    sendlabel,
    className
}: Props) {
    const [prompt, setPrompt] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const submitButtonOnClick = useCallback(() => {
        if (action) {
            action();
        }
        setPrompt('');
    }, [action, setPrompt])

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
                buttonRef.current?.click()
            }
        },
        [isLoading]
    );

    return (
        <Textarea
            endContent={
                <Button
                    ref={buttonRef}
                    spinner={<Spinner color="white" size="sm" />}
                    size="sm"
                    color="primary"
                    isLoading={isLoading}
                    isIconOnly={
                        sendlabel == undefined ||
                        sendlabel == null ||
                        sendlabel == ""
                    }
                    variant={prompt != "" ? "solid" : "flat"}
                    isDisabled={prompt == ""}
                    endContent={
                        !isLoading && (
                            <span>
                                <FiSend />
                            </span>
                        )
                    }
                    onClick={submitButtonOnClick}
                >   
                    {sendlabel}
                </Button>
            }
            className={`${className}`}
            radius="sm"
            placeholder={placeholder ?? "What can I help you with?"}
            name="prompt"
            minRows={1}
            size="lg"
            value={prompt}
            onValueChange={onPromptChange}
            onKeyDown={keyListener}
        />
    );
}
