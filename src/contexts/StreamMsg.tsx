"use client";

import { createContext, useContext, useOptimistic, useState } from "react";

const StreamingMsgContext = createContext("");
const setStreamingMsgContext = createContext<
    ((chunk: string) => void) | undefined
>(undefined);

interface Props {
    children: React.ReactNode;
}

const StreamingMsgProvider: React.FC<Props> = ({ children }) => {
    const [Stream, setStream] = useOptimistic<string, string>(
        "",
        (prev, chunk) => {
            return prev + chunk;
        }
    );

    return (
        <>
            <StreamingMsgContext.Provider value={Stream}>
                <setStreamingMsgContext.Provider value={setStream}>
                    {children}
                </setStreamingMsgContext.Provider>
            </StreamingMsgContext.Provider>
        </>
    );
};

const useStreamingMsg = () => {
    const Stream = useContext(StreamingMsgContext);
    const setStream = useContext(setStreamingMsgContext);

    return {
        Stream,
        setStream,
    };
};

export { StreamingMsgProvider, useStreamingMsg };
