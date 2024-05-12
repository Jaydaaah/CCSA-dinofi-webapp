"use client";
import { SendPromptFromFormHandler } from "@/actions/PromptActions";
import { Message, defineNewMessage, useMessages } from "@/contexts/Messages";
import { useStreamingMsg } from "@/contexts/StreamMsg";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const PromptArea: React.FC = () => {
    const { addOptiMessages } = useMessages();
    const { setStream } = useStreamingMsg();
    const { pending } = useFormStatus();
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const sendprompt = useCallback(async (prompt: string) => {
        const response = await fetch("/api/chat-stream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
            }),
        });
        const reader = response.body
            ?.pipeThrough(new TextDecoderStream())
            ?.getReader();
        if (!reader || !response.ok) return;
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            if (value && setStream) {
                const chunk = Buffer.from(value).toString("utf8");
                setStream(chunk);
            }
        }
    }, []);

    return (
        <>
            <form
                autoComplete="off"
                ref={formRef}
                action={async (formData) => {
                    formRef.current?.reset();
                    const prompt = formData.get("prompt")?.toString().trim();
                    if (addOptiMessages && prompt) {
                        const new_msg = defineNewMessage(
                            prompt,
                            true,
                            Date.now()
                        );
                        addOptiMessages(new_msg);
                        await sendprompt(prompt);
                        router.refresh();
                    }
                }}
                className="flex border shadow-sm m-3 p-2 rounded-3xl bg-white"
            >
                <input
                    autoComplete="off"
                    name="prompt"
                    type="text"
                    className="flex-grow focus:outline-none resize-none p-2 bg-transparent"
                    disabled={pending}
                />
                <div className="bg-gray-500 w-[1px] opacity-15" />
                <button type="submit" className="mx-3" disabled={pending}>
                    Send
                </button>
            </form>
        </>
    );
};

export default PromptArea;
