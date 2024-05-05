"use client";
import { SendPromptFromFormHandler } from "@/actions/PromptActions";
import { Message, useMessages } from "@/contexts/Messages";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

const PromptArea: React.FC = () => {
    const { addMessages } = useMessages();
    const { pending } = useFormStatus();
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <form
                autoComplete="off"
                ref={formRef}
                action={async (formData) => {
                    formRef.current?.reset();
                    const response = await SendPromptFromFormHandler(formData);
                    if (response && addMessages) {
                        const { text, isright, timestamp } = response;
                        const new_msg: Message = {
                            text,
                            isright,
                            timestamp,
                        };
                        addMessages(new_msg);
                    }
                }}
                className="flex border shadow-sm m-3 p-2 rounded-3xl bg-white"
            >
                <input
                    autoComplete="off"
                    name="prompt"
                    type="text"
                    className="flex-grow focus:outline-none resize-none p-2 bg-transparent"
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
