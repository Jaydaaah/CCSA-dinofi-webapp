"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import TypingIndicator from "./TypingIndicator";
import remarkGfm from "remark-gfm";
import ModMarkdown from "./ModMarkdown";

interface props {
    delay_ms?: number;
    children: AsyncGenerator<string, void, unknown>;
    timestamp: number;
    onDoneStreaming?: (children: AsyncGenerator<string, void, unknown>, timestamp: number, finalText: string) => void
}

export default function MarkdownStream({ delay_ms, timestamp, children, onDoneStreaming }: props) {
    const [doneStream, setDoneStream] = useState<boolean | null>(null);
    const [text, setText] = useState('');
    const divRef = useRef<HTMLDivElement>(null);

    const triggerUpdate = useCallback(async () => {
        setDoneStream(false);
        for await (const chunk of children) {
            for (const letter of chunk) {
                setTimeout(() => {
                    setText((prev) => prev + letter);
                }, delay_ms ?? 100);
            }
        }
        divRef.current?.scrollIntoView({
            behavior: "auto"
        });
        setDoneStream(true);
    }, [children]);

    useEffect(() => {
        if (doneStream && onDoneStreaming) {
            onDoneStreaming(children, timestamp, text);
        }
    }, [doneStream, text, timestamp, children]);

    useEffect(() => {
        setText('');
        if (doneStream == null) {
            triggerUpdate();
        }

        return () => {
            setDoneStream(null);
        }
    }, [children]);

    return (
        <div
            ref={divRef}>
                {text ? <ModMarkdown>{text}</ModMarkdown> : <TypingIndicator/>}
        </div>
    );
}
