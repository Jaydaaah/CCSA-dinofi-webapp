"use client";
import {
    Dispatch,
    SetStateAction,
} from "react";

export type MyContextPairType<type> = [type, Dispatch<SetStateAction<type>> | undefined];
export function MyContextPairDefaultValue<type>(value: type): MyContextPairType<type> {
    return [value, undefined]
}

export type MyContextPairTypeForOpti<type> = [type, ((action: type | ((pendingState: type) => type)) => void) | undefined];
export function MyContextPairTypeForOptiDefaultValue<type>(value: type): MyContextPairTypeForOpti<type> {
    return [value, undefined]
}

export function SetStateWrapper<type>(
    setState: Dispatch<SetStateAction<type>> | undefined
) {
    return (value: SetStateAction<type>) => {
        if (setState) {
            setState(value);
        }
    };
}

export function PendingStateWrapper<type>(
    pendingState: ((action: type | ((pendingState: type) => type)) => void) | undefined
) {
    return (action: type | ((pendingState: type) => type)) => {
        if (pendingState) {
            pendingState(action);
        }
    };
}

export async function* FetchPromptStream(path: string, prompt: string, chat_id?: string) {
    const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id,
            prompt,
        }),
    });
    if (!response.ok) return;
    const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        ?.getReader();
    if (!reader) return;
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break;
        }
        if (value) {
            const chunk = Buffer.from(value).toString("utf8");
            yield chunk;
        }
    }
}