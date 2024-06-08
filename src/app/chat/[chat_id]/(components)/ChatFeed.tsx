"use client";
import MarkdownStream from "@/components/MarkdownStream";
import ModMarkdown from "@/components/ModMarkdown";
import DinofiBubble from "@/components/chat-bubbles/DinofiBubble";
import UserBubble from "@/components/chat-bubbles/UserBubble";
import {
    Message,
    RenderableMessage,
    useMessage,
    useStreamable,
} from "@/hooks/Message/Message";
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 } from "uuid";

function renderStaticMessage(message?: Message) {
    if (!message) return null;
    const { isright, text, timestamp } = message;
    if (isright) {
        return (
            <UserBubble key={timestamp} timestamp={timestamp}>
                <Markdown className="markdown my-2" remarkPlugins={[remarkGfm]}>
                    {text}
                </Markdown>
            </UserBubble>
        );
    } else {
        return (
            <DinofiBubble key={timestamp} timestamp={timestamp}>
                <ModMarkdown>
                    {text}
                </ModMarkdown>
            </DinofiBubble> 
        );
    }
}

function renderStreamMessage(
    timestamp: number,
    stream?: AsyncGenerator<string, void, unknown>,
    onDoneStreaming?: (
        stream: AsyncGenerator<string, void, unknown>,
        timestamp: number,
        final_text: string
    ) => void
) {
    if (!stream) return null;
    return (
        <DinofiBubble key={timestamp}>
            <div className="">
                <MarkdownStream onDoneStreaming={onDoneStreaming} timestamp={timestamp}>
                    {stream}
                </MarkdownStream>
            </div>
        </DinofiBubble>
    );
}

function renderMessage(
    messages: RenderableMessage[],
    onDoneStreaming?: (
        stream: AsyncGenerator<string, void, unknown>,
        timestamp: number,
        final_text: string
    ) => void
) {
    return messages.map((msg) =>
        msg.type == "Static"
            ? renderStaticMessage(msg.message)
            : renderStreamMessage(msg.timestamp ?? 0, msg.stream, onDoneStreaming)
    );
}

interface props {
    className?: string;
}

export default function ChatFeed({ className }: props) {
    const { messages } = useMessage();
    const { convertToStatic } = useStreamable();
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        divRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages]);

    return (
        <ScrollShadow
            className={`flex flex-col-reverse justify-start overflow-x-hidden occupy-h ${className}`}
            size={15}
        >
            <main className="flex w-[90%] max-w-2xl flex-col-reverse justify-start self-center mx-4">
                <div ref={divRef} className="w-full h-[1px] bg-opacity-0"></div>
                {renderMessage(messages, convertToStatic)}
            </main>
            {messages.length == 0 && (
                <motion.section
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.5
                    }}
                    className="-z-10 fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
                    <span className="text-default-400 text-xl">
                        No message to display
                    </span>
                </motion.section>
            )}
        </ScrollShadow>
    );
}
