"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useOptimistic,
    useState,
} from "react";

export interface Message {
    text: string;
    isright: boolean;
    timestamp: number;
}
export const defineNewMessage = (
    text: string,
    isright: boolean,
    timestamp: number
) => {
    const new_msg: Message = {
        text,
        isright,
        timestamp,
    };
    return new_msg;
};

const emptyMessages: Message[] = [];

const MessagesContext = createContext(emptyMessages);
const setMessagesContext = createContext<((msg: Message) => void) | undefined>(
    undefined
);

interface Props {
    datas: Message[] | undefined | null;
    children: React.ReactNode;
}

const MessagesProvider: React.FC<Props> = ({ datas, children }) => {
    const [optiMessages, addOptiMessages] = useOptimistic<Message[], Message>(
        datas ?? emptyMessages,
        (state, newMsg) => [newMsg, ...state]
    );

    return (
        <MessagesContext.Provider value={optiMessages}>
            <setMessagesContext.Provider value={addOptiMessages}>
                {children}
            </setMessagesContext.Provider>
        </MessagesContext.Provider>
    );
};

interface MSGResponse {
    data: Message[];
}

const SERVER_PORT = 8080;

const useMessages = () => {
    const optiMessages = useContext(MessagesContext);
    const addOptiMessages = useContext(setMessagesContext);

    return {
        optiMessages,
        addOptiMessages,
    };
};

export { MessagesProvider, useMessages };
